import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductsService} from "../products.service";
import {Product} from "../product.model";

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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    let name = '';
    let weight = null;
    let price = null;
    let category = '';
    if (this.mode === 'edit') {
      this.id = this.productsService.selectedRow;
      let product = this.productsService.products[this.id];
      console.log(product)
      name = product.name;
      weight = product.weight;
      price = product.price;
      category = product.category;
    }
    this.productForm = new FormGroup({
        'name': new FormControl(name),
        'weight': new FormControl(weight),
        'price': new FormControl(price),
        'category': new FormControl(category),
      }
    )
  }

    onSubmit(){
      let values = this.productForm.value;
      let product = new Product(
        (this.mode === 'add' ?
            this.productsService.length : this.id),
        values['name'],
        values['weight'],
        values['price'],
        values['category']
      )
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
