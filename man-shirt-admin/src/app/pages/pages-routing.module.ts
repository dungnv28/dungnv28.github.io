import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { materialComponent } from "./specifications/material/material.component";
import { sleeveComponent } from "./specifications/sleeve/sleeve.component";
import { collarComponent } from "./specifications/collar/collar.component";
import { colorComponent } from "./specifications/color/color.component";
import { designComponent } from "./specifications/design/design.component";
import { formComponent } from "./specifications/form/form.component";
import { sizeComponent } from "./specifications/size/size.component";
import { CategoryComponent } from "./category/category.component";
import { discountComponent } from "./discount/discount.component";
import { voucherComponent } from "./voucher/voucher.component";
import { ProductComponent } from "./product/product.component";
import { OrderComponent } from "./order/order.component";
import { ContactComponent } from "./contactShop/contact.component";
import { employeeComponent } from "./employee copy/employee.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DefaultComponent },
  { path: "orders", component: OrderComponent },
  { path: "products", component: ProductComponent },
  { path: "categorys", component: CategoryComponent },
  { path: "discounts", component: discountComponent },
  { path: "vouchers", component: voucherComponent },
  { path: "contact", component: ContactComponent },
  { path: "customer", component: ContactComponent },
  { path: "employee", component: employeeComponent },
  { path: "statistical", component: ContactComponent },
  {
    path: "attributes",
    children: [
      {
        path: "material",
        component: materialComponent,
      },
      {
        path: "collar",
        component: collarComponent,
      },
      {
        path: "sleeve",
        component: sleeveComponent,
      },
      {
        path: "color",
        component: colorComponent,
      },
      {
        path: "design",
        component: designComponent,
      },
      {
        path: "form",
        component: formComponent,
      },
      {
        path: "size",
        component: sizeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
