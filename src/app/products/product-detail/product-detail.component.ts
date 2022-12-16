import {Component, Input} from '@angular/core';
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() select: boolean | undefined;
  product = this.productService.getProductById(
    this.productService.selectedRow
  )

  constructor(private productService: ProductsService){}

  onLeave(){
    this.productService.selectProduct();
  }
}
