export class Product{
  id : number;
  name: string;
  weight: number
  price: number
  category: string

  constructor(id: number,
              name: string,
              weight: number,
              price:number,
              category: string) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.price = price;
    this.category = category;

  }
}
