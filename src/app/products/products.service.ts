import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductsService{
  private url = "http://localhost:8080";
  editModeChanged = new Subject<boolean>()
  selectChanged = new Subject<boolean>();
  productsChanged = new Subject<Product[]>()
  add = false;
  headings = ['id','name','weight','price','category']
  selectedRow: number;
  products: Product[] = [];
  length = 0;

  constructor(private http: HttpClient){
    this.selectedRow = 0
    this.getAllProducts().subscribe(
      (value) => {
        this.products = value;
        this.length = value.length
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
    this.updateTable();
    this.length++;
    this.products.push(product);
    this.editModeChanged.next(false);
    console.log(this.selectedRow)
    console.log(this.products)
    return this.http.post(this.url, {id: product.id,
      name:product.name,weight: product.weight, price: product.price, category: product.category})
      .subscribe();
  }

  editProduct(product: Product){
    this.updateTable();
    this.products[product.id] = product
    this.editModeChanged.next(false);
    return this.http.put(`${this.url}`, {id: product.id,
      name:product.name,weight: product.weight, price: product.price, category: product.category})
      .subscribe(
        value => {console.log('works')}
      );
  }
  deleteProduct(){
    this.products.splice(this.selectedRow,1)
    this.updateTable();
    let rowToDelete = this.selectedRow;
    this.selectedRow = -1;
    return this.http.delete(`${this.url}`, {body: rowToDelete})
      .subscribe(
        value => {console.log('works')}
      );
  }

  selectProduct(){
    this.selectChanged.next(false);
  }

  updateTable(){
    this.productsChanged.next(this.products);
  }
}
