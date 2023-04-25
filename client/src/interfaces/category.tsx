import { IProduct } from "./product";

export interface ICategory {
  _id?: string;
  name: string;
  image?: string;
  products?: Array<IProduct>;
}
