import {Component, Output} from '@angular/core';
import {Product} from "./product.model";
import {ProductsService} from "./products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Output() editMode = false;
  @Output() select = false;
  @Output() mode: string;
  products: Product[];
  headings = this.productsService.headings;
  selectedRow = this.productsService.selectedRow;

  constructor(private productsService: ProductsService) {
    this.productsService.editModeChanged.subscribe(
      (value) => this.editMode = value
    )
    this.productsService.selectChanged.subscribe(
      (value) => this.select = value
    )
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
    })
    this.productsService.productsChanged.subscribe(data => {
      this.products = data;
    })
  }

  onClickRow(index: number){
    this.productsService.selectedRow = index;
    this.selectedRow = index;
  }

  onAdd(){
    this.editMode = true;
    this.mode = 'add';
  }

  onEdit(){
    this.editMode = true;
    this.mode = 'edit';
  }

  onDelete(){
    this.productsService.deleteProduct();
    this.selectedRow = -1;

  }

  onSelect(){
    this.select = true;
  }

}
