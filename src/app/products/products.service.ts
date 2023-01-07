import {Injectable, OnInit} from "@angular/core";
import {Product} from "./product.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "./categories.model";

@Injectable()
export class ProductsService {
  private url = "http://localhost:8080";
  private urlCategory = "http://localhost:8080/categories";
  editModeChanged = new Subject<boolean>()
  selectChanged = new Subject<boolean>();
  productsChanged = new Subject<Product[]>()
  add = false;
  headings = ['name','weight','price','category']
  selectedRow: number;
  products: Product[] = [];
  categories: Category[] = [];
  length = 0;

  constructor(private http: HttpClient){
    this.selectedRow = 0
    this.getAllProducts().subscribe(
      (value) => {
        this.products = value;
        this.length = value.length
      }
    );
    this.getCategories().subscribe(
      (value) => {
        this.categories = value;
      }
    );
  }
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number){
    return this.products[id]
  }
  addProduct(product: Product){
    this.length++;
    this.products.push(product);
    this.updateTable();
    this.editModeChanged.next(false);
    return this.http.post(this.url, {id: product.id,
      name:product.name,weight: product.weight, price: product.price, category: product.category})
      .subscribe();
  }

  editProduct(product: Product){
    for(let i=0; i< this.products.length; i++){
      if(this.products[i].id === product.id){
        this.products[i] = product;
        break
      }
    }
    this.updateTable();
    this.editModeChanged.next(false);
    return this.http.put(`${this.url}`, {id: product.id,
      name:product.name,weight: product.weight, price: product.price, category: product.category})
      .subscribe();
  }
  deleteProduct(){
    for(let i=0; i< this.products.length; i++){
      if(this.products[i].id === this.selectedRow){
        this.products.splice(i,1)
        break
      }
    }    this.updateTable();
    this.updateTable();
    let rowToDelete = this.selectedRow;
    this.selectedRow = -1;
    return this.http.delete(`${this.url}`, {body: rowToDelete})
      .subscribe();
  }

  selectProduct(){
    this.selectChanged.next(false);
  }

  updateTable(){
    this.productsChanged.next(this.products);
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.urlCategory);

  }

}
