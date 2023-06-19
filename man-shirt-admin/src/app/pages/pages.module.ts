import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng5SliderModule } from "ng5-slider";
import {
  NgbModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SimplebarAngularModule } from "simplebar-angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction"; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from "ngx-lightbox";
import { WidgetModule } from "../shared/widget/widget.module";
import { UIModule } from "../shared/ui/ui.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardsModule } from "./dashboards/dashboards.module";
import { EcommerceModule } from "./ecommerce/ecommerce.module";
import { CryptoModule } from "./crypto/crypto.module";
import { EmailModule } from "./email/email.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { ProjectsModule } from "./projects/projects.module";
import { TasksModule } from "./tasks/tasks.module";
import { ContactsModule } from "./contacts/contacts.module";
import { UtilityModule } from "./utility/utility.module";
import { UiModule } from "./ui/ui.module";
import { FormModule } from "./form/form.module";
import { TablesModule } from "./tables/tables.module";
import { IconsModule } from "./icons/icons.module";
import { ChartModule } from "./chart/chart.module";
import { CalendarComponent } from "./calendar/calendar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ChatComponent } from "./chat/chat.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FilemanagerComponent } from "./filemanager/filemanager.component";
import { SpecificationsModule } from "./specifications/specifications.module";
import { CategoryComponent } from "./category/category.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { discountComponent } from "./discount/discount.component";
import { voucherComponent } from "./voucher/voucher.component";
import { ProductComponent } from "./product/product.component";
import { ContactComponent } from "./contactShop/contact.component";
import { employeeComponent } from "./employee copy/employee.component";
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
]);
import { NgxMaskModule } from "ngx-mask";
import { NgSelectModule } from "@ng-select/ng-select";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { OrderComponent } from "./order/order.component";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
@NgModule({
  declarations: [
    CalendarComponent,
    ChatComponent,
    FilemanagerComponent,
    CategoryComponent,
    discountComponent,
    voucherComponent,
    ProductComponent,
    OrderComponent,
    ContactComponent,
    employeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    SpecificationsModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    CryptoModule,
    EcommerceModule,
    EmailModule,
    InvoicesModule,
    HttpClientModule,
    ProjectsModule,
    UIModule,
    TasksModule,
    ContactsModule,
    UtilityModule,
    UiModule,
    FormModule,
    TablesModule,
    IconsModule,
    ChartModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    MatTableModule,
    MatIconModule,
    FormModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    Ng5SliderModule,
    NgxMaskModule,
    NgSelectModule,
    DropzoneModule,
  ],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
