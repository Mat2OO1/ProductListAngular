import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductsService} from "../products.service";
import {Product} from "../product.model";
import {Category} from "../categories.model";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  @Input() editMode: boolean;
  @Input() mode: string;
  productForm : FormGroup;
  id:number;
  categories: Category[];

  constructor(private productsService: ProductsService) {
    this.categories = this.productsService.categories
  }

  ngOnInit(): void {
    let name = '';
    let weight = null;
    let price = null;
    let category = -1;
    if (this.mode === 'edit') {
      console.log(this.productsService.products)
      this.id = this.productsService.selectedRow;
      console.log(this.id)
      let product = this.productsService.products.filter((product) => {return product.id === this.id})[0];
      console.log(product);
      name = product.name;
      weight = product.weight;
      price = product.price;
      category = product.category.category_id;
    }
    this.productForm = new FormGroup({
        'name': new FormControl(name),
        'weight': new FormControl(weight),
        'price': new FormControl(price),
        'category': new FormControl(category),
      }
    )

    console.log(this.categories)
  }

    onSubmit(){
      let values = this.productForm.value;
      let product = new Product(
        (this.mode === 'add' ?
            this.productsService.length : this.id),
        values['name'],
        values['weight'],
        values['price'],
        this.categories[values['category']]
      )
      console.log(product)
      this.editMode = false;
      if(this.mode==='add'){
        this.productsService.addProduct(product)
      }
      else {
        this.productsService.editProduct(product);
      }
      this.productsService.selectedRow = -1;

  }



}
