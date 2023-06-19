import { Component, OnInit, Pipe, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import { voucherRequest,voucherResponse } from "src/app/core/models/voucher.models";
import { VoucherService } from "src/app/core/services/voucher.service";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
@Component({
  selector: "app-voucher",
  templateUrl: "./voucher.component.html",
  styleUrls: ["./voucher.component.scss"],
})

export class voucherComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  term: any;
  mateRial: voucherRequest = {
    id: null,
    name: null,
    startDate: new Date(),
    endDate: new Date(),
    description: null,
    discount: null,
    createTime: new Date(),
    updateTime: null,
    createBy: null,
    updateBy: null,
    status: 0,
  };
  materialData: voucherResponse[];

  osTypeDataPage: voucherResponse[];
  totalItems = 0;
  itemsPerPage = 3;
  currentPage = 1;
  formData: FormGroup;
  submitted = false;
  modalRef: NgbModalRef;
  fileName = 'discount.xlsx';
  @ViewChild("content") content: any;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private mateRialService: VoucherService
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [


    ];
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
       description: ["", [Validators.required]],
       discount: ["", [Validators.required]],
       startDate: ["", [Validators.required]],
       endDate: ["", [Validators.required]],
    });
    this.loadData();
  }
  loadData(): void {
    this.mateRialService.getMaterial().subscribe((data) => {
      this.materialData = data;
      console.log(data);
      this.totalItems = data.length;
      this.osTypeDataPage = data.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    });
  }
  onPageChange(event): void {
    this.currentPage = event;
    this.osTypeDataPage = this.materialData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  get form() {
    return this.formData.controls;
  }
  openModal() {
    this.mateRial.id = null;
    this.modalRef = this.modalService.open(this.content);
  }
  closeModal(): void {
    this.modalRef.close();
  }
  saveOsType() {
    this.submitted = true;
    if (this.formData.valid) {
      const name = this.formData.get("name").value;
      this.mateRial.name = name;
      const description = this.formData.get("description").value;
      this.mateRial.description = description;
      const startDate = this.formData.get("startDate").value;
      this.mateRial.startDate = new Date(startDate);
      console.log(startDate);
      const endDate = this.formData.get("endDate").value;
      this.mateRial.endDate = new Date(endDate);
      const discount = this.formData.get("discount").value;
      this.mateRial.discount = discount;

      if (this.mateRial.id == null) {
        this.mateRialService.createMaterial(this.mateRial).subscribe({
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
        this.mateRialService.updateMaterial(this.mateRial).subscribe({
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
  editOsType(mateRial: voucherResponse) {
    this.formData.setValue({
      name: mateRial.name,
      description: mateRial.description,
      startDate: mateRial.startDate,
      endDate: mateRial.endDate,
      discount: mateRial.discount,
    });
    this.openModal();
    this.mateRial.id = mateRial.id;
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
        this.mateRialService.deleteMaterial(id).subscribe({
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
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.materialData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'discount');
      XLSX.writeFile(wb, this.fileName);
    }
  }
}
