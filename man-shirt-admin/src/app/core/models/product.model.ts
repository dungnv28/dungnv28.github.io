import { categoryResponse } from "./category.models";
import { collar } from "./collar.models";
import { design } from "./design.models";
import { discount } from "./discount.models";
import { form } from "./form.models";
import { material } from "./material.models";
import {
  ProductDetailRequest,
  ProductDetailRespone,
} from "./productDetail.model";
import {
  ProductImageRequest,
  ProductImageResponse,
} from "./productImage.model";
import { sleeve } from "./sleeve.models";

export class ProductRespone {
  id: number;
  name: string;
  createTime: Date;
  updateTime: Date;
  createBy: string;
  updateBy: string;
  price: number;
  description: string;
  weight: number;
  category: categoryResponse;
  design: design;
  form: form;
  material: material;
  sleeve: sleeve;
  collar: collar;
  discount: discount;
  status: number;
  productDetail: ProductDetailRespone[];
  productImage: ProductImageResponse[];
}
export class ProductRequest {
  id: number;
  name: string;
  price: number;
  description: string;
  weight: number;
  category: number;
  design: number;
  form: number;
  material: number;
  sleeve: number;
  collar: number;
  discount: number;
  productDetail: ProductDetailRequest[];
  productImage: ProductImageRequest[];
}
