import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

import { StatComponent } from "./stat/stat.component";
import { TransactionComponent } from "./transaction/transaction.component";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
@NgModule({
  declarations: [StatComponent, TransactionComponent],
  imports: [CommonModule, NgbModalModule],
  exports: [StatComponent, TransactionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
