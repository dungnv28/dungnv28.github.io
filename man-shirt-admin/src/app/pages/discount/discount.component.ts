import { Component, OnInit, Pipe, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import { discount } from "src/app/core/models/discount.models";
import { DiscountService } from "src/app/core/services/discount.service";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
@Component({
  selector: "app-discount",
  templateUrl: "./discount.component.html",
  styleUrls: ["./discount.component.scss"],
})
export class discountComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  term: any;
  discount: discount = {
    id: null,
    name: null,
    startDate: new Date(),
    endDate: new Date(),
    description: null,
    percent: null,
    createTime: new Date(),
    updateTime: null,
    createBy: null,
    updateBy: null,
    status: 0,
  };
  discountData: discount[];

  osTypeDataPage: discount[];
  totalItems = 0;
  itemsPerPage = 3;
  currentPage = 1;
  formData: FormGroup;
  submitted = false;
  modalRef: NgbModalRef;
  fileName = "discount.xlsx";
  @ViewChild("content") content: any;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [];
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      percent: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });
    this.loadData();
  }
  loadData(): void {
    this.discountService.getDiscount().subscribe((data) => {
      this.discountData = data;
      this.totalItems = data.length;
      this.osTypeDataPage = data.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    });
  }
  onPageChange(event): void {
    this.currentPage = event;
    this.osTypeDataPage = this.discountData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  get form() {
    return this.formData.controls;
  }
  openModal() {
    this.discount.id = null;
    this.modalRef = this.modalService.open(this.content);
  }
  closeModal(): void {
    this.modalRef.close();
  }
  saveOsType() {
    this.submitted = true;
    if (this.formData.valid) {
      const name = this.formData.get("name").value;
      this.discount.name = name;
      const description = this.formData.get("description").value;
      this.discount.description = description;
      const startDate = this.formData.get("startDate").value;
      this.discount.startDate = new Date(startDate);
      console.log(startDate);
      const endDate = this.formData.get("endDate").value;
      this.discount.endDate = new Date(endDate);
      const percent = this.formData.get("percent").value;
      this.discount.percent = percent;

      if (this.discount.id == null) {
        this.discountService.createDiscount(this.discount).subscribe({
          next: (res) => {
            this.closeModal();
            Swal.fire("Success!", " added successfully.", "success");
            this.loadData();
          },
          error: (err) => {
            Swal.fire("Error!", "Failed to add .", "error");
          },
        });
      } else {
        this.discountService.updateDiscount(this.discount).subscribe({
          next: (res) => {
            this.closeModal();
            Swal.fire("Success!", " updated successfully.", "success");
            this.loadData();
          },
          error: (err) => {
            Swal.fire("Error!", "Failed to update .", "error");
          },
        });
      }
    }
  }
  editOsType(discount: discount) {
    this.formData.setValue({
      name: discount.name,
      description: discount.description,
      startDate: discount.startDate,
      endDate: discount.endDate,
      percent: discount.percent,
    });
    this.openModal();
    this.discount.id = discount.id;
  }
  deleteOsType(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning", // thay thế type bằng icon
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.discountService.deleteDiscount(id).subscribe({
          next: (res) => {
            Swal.fire("Deleted!", "OS Type has been deleted.", "success");
            this.loadData();
          },
          error: (err) => {
            Swal.fire("Error!", "Failed to delete OS Type.", "error");
          },
        });
      }
    });
  }
  ExportTOExcel() {
    {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.discountData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "discount");
      XLSX.writeFile(wb, this.fileName);
    }
  }
}
