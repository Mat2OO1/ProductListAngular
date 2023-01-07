import {Category} from "./categories.model";

export class Product{
  id : number;
  name: string;
  weight: number
  price: number
  category: Category

  constructor(id: number,
              name: string,
              weight: number,
              price:number,
              category: Category) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.price = price;
    this.category = category;

  }
}
