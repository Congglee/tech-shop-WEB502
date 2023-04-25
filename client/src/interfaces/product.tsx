import { ICategory } from "./category";

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  images?: Array<string | object>;
  description?: string;
  categoryId?: ICategory;
}
