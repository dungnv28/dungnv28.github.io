import { Component, OnInit, ViewChild } from "@angular/core";
import { Options } from "ng5-slider";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Lightbox } from "ngx-lightbox";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CategoryService } from "src/app/core/services/category.service";
import { categoryResponse } from "src/app/core/models/category.models";
import { DesignService } from "src/app/core/services/design.service";
import { design } from "src/app/core/models/design.models";
import { FormService } from "src/app/core/services/form.service";
import { form } from "src/app/core/models/form.models";
import { MaterialService } from "src/app/core/services/material.service";
import { material } from "src/app/core/models/material.models";
import { SleeveService } from "src/app/core/services/sleeve.service";
import { CollarService } from "src/app/core/services/collar.service";
import { sleeve } from "src/app/core/models/sleeve.models";
import { collar } from "src/app/core/models/collar.models";
import Swal from "sweetalert2";
import { ColorService } from "src/app/core/services/color.service";
import { color } from "src/app/core/models/color.models";
import { size } from "src/app/core/models/size.models";
import { SizeService } from "src/app/core/services/size.service";
import {
  ProductRequest,
  ProductRespone,
} from "src/app/core/models/product.model";
import {
  ProductDetailRequest,
  ProductDetailRespone,
} from "src/app/core/models/productDetail.model";
import {
  ProductImageRequest,
  ProductImageResponse,
} from "src/app/core/models/productImage.model";
import { discount } from "src/app/core/models/discount.models";
import { DiscountService } from "src/app/core/services/discount.service";
import { ImageUploadDto } from "src/app/core/models/upload.models";
import { ProductService } from "src/app/core/services/product.service";
import { UploadService } from "src/app/core/services/upload.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ProductComponent implements OnInit {
  submittedDesign = false;
  submittedForm = false;
  submittedMaterial = false;
  submittedSleeve = false;
  submittedCollar = false;
  submittedColor = false;
  submittedSize = false;

  design: design = {
    id: 0,
    name: "",
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };
  formValue: form = {
    id: 0,
    name: "",
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };
  material: material = {
    id: 0,
    name: "",
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };
  sleeve: sleeve = {
    id: 0,
    name: "",
    diameter: 0,
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };
  collar: collar = {
    id: 0,
    name: "",
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };
  color: color = {
    id: 0,
    name: "",
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };
  size: size = {
    id: 0,
    code: "",
    description: "",
    createTime: undefined,
    updateTime: undefined,
    createBy: "",
    updateBy: "",
    status: 0,
  };

  product: ProductRequest = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    weight: 0,
    category: 0,
    design: 0,
    form: 0,
    material: 0,
    sleeve: 0,
    collar: 0,
    discount: 0,
    productDetail: [],
    productImage: [],
  };
  formData: FormGroup;
  formDesign: FormGroup;
  formForm: FormGroup;
  formMaterial: FormGroup;
  formSleeve: FormGroup;
  formCollar: FormGroup;
  formColor: FormGroup;
  formSize: FormGroup;
  formProductDetail: FormGroup[];

  modalRef: NgbModalRef;
  modalDesign: NgbModalRef;
  modalForm: NgbModalRef;
  modalMaterial: NgbModalRef;
  modalSleeve: NgbModalRef;
  modalCollar: NgbModalRef;
  modalColor: NgbModalRef;
  modalSize: NgbModalRef;

  categoryDatas: categoryResponse[];
  designDatas: design[];
  formDatas: form[];
  materialDatas: material[];
  sleeveDatas: sleeve[];
  collarDatas: collar[];
  colorDatas: color[];
  sizeDatas: size[];
  discountDatas: discount[];

  @ViewChild("content") content: any;
  @ViewChild("designModal") designModal: any;
  @ViewChild("formModal") formModal: any;
  @ViewChild("materialModal") materialModal: any;
  @ViewChild("sleeveModal") sleeveModal: any;
  @ViewChild("collarModal") collarModal: any;
  @ViewChild("colorModal") colorModal: any;
  @ViewChild("sizeModal") sizeModal: any;

  isLoading = false;
  totalItems = 0;
  itemsPerPage = 2;
  currentPage = 1;
  productListDatas: ProductRespone[];
  productListDatasPage: ProductRespone[];
  productEdit = false;
  breadCrumbItems: Array<{}>;
  pricevalue = 50000;
  minVal = 50000;
  maxVal = 5000000;
  term: any;
  priceoption: Options = {
    floor: 50000,
    ceil: 5000000,
    translate: (value: number): string => {
      return value + "đ";
    },
  };
  log = "";
  discountRates: number[] = [];

  constructor(
    private lightbox: Lightbox,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private designService: DesignService,
    private formService: FormService,
    private materialService: MaterialService,
    private sleeveService: SleeveService,
    private collarService: CollarService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private discountService: DiscountService,
    private productService: ProductService,
    private uploadService: UploadService
  ) {
    for (let i = 0; i < this.products.length; i++) {
      this.formProductDetail[i] = this.formBuilder.group({
        ["id"]: [""],
        ["barCode"]: ["", Validators.required],
        ["quantity"]: ["", Validators.required],
      });
    }
    this.formDesign = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    this.formForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    this.formMaterial = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    this.formSleeve = this.formBuilder.group({
      name: ["", [Validators.required]],
      diameter: ["", [Validators.required]],
    });
    this.formCollar = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    this.formColor = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    this.formSize = this.formBuilder.group({
      code: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Quản lý" },
      { label: "Sản phẩm", active: true },
    ];
    this.loadData();
    this.cbcCategory();
    this.cbcDesign();
    this.cbcForm();
    this.cbcMaterial();
    this.cbcSleve();
    this.cbcCollar();
    this.cbcColor();
    this.cbcSize();
    this.cbcDiscount();
  }
  loadData() {
    this.productService.getProduct().subscribe({
      next: (data) => {
        this.productListDatas = data;
        this.totalItems = data.length;
        this.productListDatasPage = data.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
      },
      error: (err) => {},
    });
  }
  get form() {
    return this.formData.controls;
  }
  get formValueDesign() {
    return this.formDesign.controls;
  }
  get formValueForm() {
    return this.formForm.controls;
  }
  get formValueMaterial() {
    return this.formMaterial.controls;
  }
  get formValueSleeve() {
    return this.formSleeve.controls;
  }
  get formValueCollar() {
    return this.formCollar.controls;
  }
  get formValueColor() {
    return this.formColor.controls;
  }
  get formValueSize() {
    return this.formSize.controls;
  }

  openModal() {
    this.formData = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
      discount: [""],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
      weight: ["", [Validators.required]],
      design: ["", [Validators.required]],
      form: ["", [Validators.required]],
      material: ["", [Validators.required]],
      sleeve: ["", [Validators.required]],
      collar: ["", [Validators.required]],
      colors: ["", [Validators.required]],
      sizes: ["", [Validators.required]],
    });
    this.selectedColors = [];
    this.imagesByColor = [];
    // this.category.id = null;
    this.productEdit = false;
    this.modalRef = this.modalService.open(this.content, {
      size: "xl",
    });
  }
  cbcCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categoryDatas = data;
    });
  }
  cbcDesign() {
    this.designService.getDesign().subscribe((data) => {
      this.designDatas = data;
    });
  }
  cbcForm() {
    this.formService.getForm().subscribe((data) => {
      this.formDatas = data;
    });
  }
  cbcMaterial() {
    this.materialService.getMaterial().subscribe((data) => {
      this.materialDatas = data;
    });
  }
  cbcSleve() {
    this.sleeveService.getSleeve().subscribe((data) => {
      this.sleeveDatas = data;
    });
  }
  cbcCollar() {
    this.collarService.getCollar().subscribe((data) => {
      this.collarDatas = data;
    });
  }
  cbcColor() {
    this.colorService.getColor().subscribe((data) => {
      this.colorDatas = data;
    });
  }
  cbcSize() {
    this.sizeService.getSize().subscribe((data) => {
      this.sizeDatas = data;
    });
  }
  cbcDiscount() {
    this.discountService.getDiscount().subscribe((data) => {
      this.discountDatas = data;
    });
  }

  openDesignModal() {
    this.modalDesign = this.modalService.open(this.designModal, {
      size: "s",
    });
  }
  openFormModal() {
    this.modalForm = this.modalService.open(this.formModal, {
      size: "s",
    });
  }
  openMaterialModal() {
    this.modalMaterial = this.modalService.open(this.materialModal, {
      size: "s",
    });
  }
  openSleeveModal() {
    this.modalSleeve = this.modalService.open(this.sleeveModal, {
      size: "s",
    });
  }
  openCollarModal() {
    this.modalCollar = this.modalService.open(this.collarModal, {
      size: "s",
    });
  }
  openColorModal() {
    this.modalColor = this.modalService.open(this.colorModal, {
      size: "s",
    });
  }

  openSizeModal() {
    this.modalSize = this.modalService.open(this.sizeModal, {
      size: "s",
    });
  }
  saveDesign() {
    this.submittedDesign = true;
    if (this.formDesign.valid) {
      const name = this.formDesign.get("name").value;
      this.design.name = name;
      this.designService.createDesign(this.design).subscribe({
        next: (res) => {
          this.modalDesign.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcDesign();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }

  saveForm() {
    this.submittedForm = true;
    if (this.formForm.valid) {
      const name = this.formForm.get("name").value;
      this.formValue.name = name;
      this.formService.createForm(this.formValue).subscribe({
        next: (res) => {
          this.modalForm.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcForm();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }
  saveMaterial() {
    this.submittedMaterial = true;
    if (this.formMaterial.valid) {
      const name = this.formMaterial.get("name").value;
      this.material.name = name;
      this.materialService.createMaterial(this.material).subscribe({
        next: (res) => {
          this.modalMaterial.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcMaterial();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }
  saveSleeve() {
    this.submittedSleeve = true;
    if (this.formSleeve.valid) {
      const name = this.formSleeve.get("name").value;
      this.sleeve.name = name;
      this.sleeveService.createSleeve(this.sleeve).subscribe({
        next: (res) => {
          this.modalSleeve.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcSleve();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }
  saveCollar() {
    this.submittedCollar = true;
    if (this.formCollar.valid) {
      const name = this.formCollar.get("name").value;
      this.collar.name = name;
      this.collarService.createCollar(this.collar).subscribe({
        next: (res) => {
          this.modalCollar.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcCollar();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }
  saveColor() {
    this.submittedColor = true;
    if (this.formColor.valid) {
      const name = this.formColor.get("name").value;
      this.color.name = name;
      this.colorService.createColor(this.color).subscribe({
        next: (res) => {
          this.modalColor.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcColor();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }
  saveSize() {
    this.submittedSize = true;
    if (this.formSize.valid) {
      const name = this.formSize.get("code").value;
      const description = this.formSize.get("description").value;
      this.size.code = name;
      this.size.description = description;
      this.sizeService.createSize(this.size).subscribe({
        next: (res) => {
          this.modalSize.close();
          Swal.fire("Success!", " added successfully.", "success");
          this.cbcSize();
        },
        error: (err) => {
          Swal.fire("Error!", "Failed to add .", "error");
        },
      });
    }
  }
  saveProduct() {
    if (this.formData.valid && this.formProductDetail.every((x) => x.valid)) {
      if (this.validImages()) {
        this.isLoading = true;
        this.product.productDetail = [];
        this.product.productImage = [];
        this.product.id = this.formData.get("id").value;
        this.product.name = this.formData.get("name").value;
        this.product.price = this.formData.get("price").value;
        this.product.description = this.formData.get("description").value;
        this.product.weight = this.formData.get("weight").value;
        this.product.category = this.formData.get("category").value;
        this.product.design = this.formData.get("design").value;
        this.product.form = this.formData.get("form").value;
        this.product.material = this.formData.get("material").value;
        this.product.sleeve = this.formData.get("sleeve").value;
        this.product.collar = this.formData.get("collar").value;
        this.product.discount = this.formData.get("discount").value;
        for (let i = 0; i < this.formProductDetail.length; i++) {
          const productDetail = {
            id: 0,
            barCode: undefined,
            quantity: 0,
            color: 0,
            size: 0,
            productId: 0,
          };
          productDetail.barCode =
            this.formProductDetail[i].get("barCode").value;
          productDetail.quantity =
            this.formProductDetail[i].get("quantity").value;
          productDetail.color = this.products[i].color;
          productDetail.size = this.products[i].size;
          this.product.productDetail[i] = productDetail;
        }
        const uploadPromises = [];

        for (const color of this.selectedColors) {
          if (this.imagesByColor[color.id]) {
            const imageFiles: File[] = [];
            for (let i = 0; i < this.imagesByColor[color.id].length; i++) {
              imageFiles.push(this.imagesByColor[color.id][i].file);
            }

            const uploadPromise = this.uploadService
              .uploadImageByColor(imageFiles)
              .toPromise()
              .then((res) => {
                for (const image of res.imageIds) {
                  const productImage: ProductImageRequest = {
                    id: 0,
                    mainImage: false,
                    urlImage: undefined,
                    colorId: 0,
                    productId: 0,
                    status: 0,
                  };
                  productImage.urlImage = image;
                  productImage.colorId = color.id;
                  this.product.productImage.push(productImage);
                }
              })
              .catch((err) => {
                // Handle error here
              });

            uploadPromises.push(uploadPromise);
          }
        }

        Promise.all(uploadPromises)
          .then(() => {
            this.productService.createProduct(this.product).subscribe({
              next: (res) => {
                this.modalRef.close();
                Swal.fire("Success!", " Added successfully.", "success");
                this.isLoading = false;
                this.loadData();
                this.clear();
              },
              error: (err) => {
                Swal.fire("Error!", "Failed to add .", "error");
                this.isLoading = false;
              },
            });
          })
          .catch((err) => {
            // Handle error here
          });
      } else {
        Swal.fire("Cảnh báo!", "Mỗi màu phải có ít nhất 4 ảnh", "warning");
      }
    } else {
      Swal.fire(
        "Cảnh báo!",
        "Bạn cần phải nhập đủ thông tin của sản phẩm",
        "warning"
      );
    }
  }
  editProduct(element: any) {
    this.productEdit = true;
    this.formData = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
      discount: [""],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
      weight: ["", [Validators.required]],
      design: ["", [Validators.required]],
      form: ["", [Validators.required]],
      material: ["", [Validators.required]],
      sleeve: ["", [Validators.required]],
      collar: ["", [Validators.required]],
      colors: ["", [Validators.required]],
      sizes: ["", [Validators.required]],
    });
    this.formData.get("id").setValue(element.id);
    this.formData.get("name").setValue(element.name);
    this.formData.get("category").setValue(element.category.id);
    this.formData.get("description").setValue(element.description);
    this.formData.get("price").setValue(element.price);
    this.formData.get("weight").setValue(element.weight);
    this.formData.get("design").setValue(element.design.id);
    this.formData.get("form").setValue(element.form.id);
    this.formData.get("material").setValue(element.material.id);
    this.formData.get("sleeve").setValue(element.sleeve.id);
    this.formData.get("collar").setValue(element.collar.id);
    this.selectedColors = [];
    this.imagesByColor = [];
    element.productImage.forEach((productImage) => {
      const color = productImage.color;
      const index = this.selectedColors.findIndex(
        (c) => c.id === color.id && c.name === color.name
      );
      if (index === -1) {
        this.selectedColors.push(color);
      }
    });
    for (const color of this.selectedColors) {
      for (const img of element.productImage) {
        if (img.color.id === color.id) {
          const image = {
            file: null,
            url: "http://localhost:8080/image/" + img.urlImage,
            color: color,
          };
          if (!this.imagesByColor[color.id]) {
            this.imagesByColor[color.id] = [];
          }
          this.imagesByColor[color.id].push(image);
        }
      }
    }
    console.log(this.imagesByColor);

    this.modalRef = this.modalService.open(this.content, {
      size: "lg",
    });
  }
  clear() {
    this.formData.reset();
    this.formData.clearValidators();
    this.formData.updateValueAndValidity();
    for (let i = 0; i < this.formProductDetail.length; i++) {
      this.clearForm(i);
    }
    this.selectedColors = [];
    this.products = [];
    this.imagesByColor = [];
  }
  clearForm(index) {
    this.formProductDetail[index].reset();
    this.formProductDetail[index].clearValidators();
    this.formProductDetail[index].updateValueAndValidity();
  }
  validImages() {
    for (const color of this.selectedColors) {
      if (this.imagesByColor[color.id].length < 4) {
        return false;
      }
    }
    return true;
  }
  onPageChange(event): void {
    this.currentPage = event;
    this.productListDatasPage = this.productListDatas.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  searchFilter(e) {
    // const searchStr = e.target.value;
    // this.products = productList.filter((product) => {
    //   return product.name.toLowerCase().search(searchStr.toLowerCase()) !== -1;
    // });
  }

  discountLessFilter(e, percentage) {
    // if (e.target.checked && this.discountRates.length === 0) {
    //   this.products = productList.filter((product) => {
    //     return product.discount < percentage;
    //   });
    // } else {
    //   this.products = productList.filter((product) => {
    //     return product.discount >= Math.max.apply(null, this);
    //   }, this.discountRates);
    // }
  }

  discountMoreFilter(e, percentage: number) {
    // if (e.target.checked) {
    //   this.discountRates.push(percentage);
    // } else {
    //   this.discountRates.splice(this.discountRates.indexOf(percentage), 1);
    // }
    // this.products = productList.filter((product) => {
    //   return product.discount >= Math.max.apply(null, this);
    // }, this.discountRates);
  }

  valueChange(value: number, boundary: boolean): void {
    // if (boundary) {
    //   this.minVal = value;
    // } else {
    //   this.maxVal = value;
    //   this.products = productList.filter(function (product) {
    //     return product.disRate <= value && product.disRate >= this;
    //   }, this.minVal);
    // }
  }
  ExportTOExcel() {
    // {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "color");
    //   XLSX.writeFile(wb, this.fileName);
    // }
  }
  imagesByColor: { [color: number]: any[] } = {};
  onFileSelected(event: any, color: any) {
    const files: File[] = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = { file: file, url: e.target.result, color: color };
        if (!this.imagesByColor[color]) {
          this.imagesByColor[color] = [];
        }
        this.imagesByColor[color].push(image);
      };
      reader.readAsDataURL(file);
    }
  }
  removeImage(image: any) {
    const color = image.color;
    const index = this.imagesByColor[color].indexOf(image);
    if (index >= 0) {
      this.imagesByColor[color].splice(index, 1);
      if (this.imagesByColor[color].length === 0) {
        delete this.imagesByColor[color];
      }
    }
  }
  products: any[] = [];
  selectedColors: any[] = [];
  selectedSizes: any[] = [];
  onChange() {
    this.products = [];
    for (let size of this.formData.get("sizes")?.value) {
      for (let color of this.formData.get("colors")?.value) {
        this.products.push({
          name:
            "Áo thun " +
            this.colorDatas.find((c) => c.id === color)?.name +
            "-" +
            this.sizeDatas.find((c) => c.id === size)?.code,
          color: color,
          size: size,
        });
      }
    }
    this.selectedColors = [];
    for (let color of this.formData.get("colors")?.value) {
      this.selectedColors.push(this.colorDatas.find((c) => c.id === color));
      this.imagesByColor[color] = [];
    }
    this.selectedSizes = [];
    for (let size of this.formData.get("sizes")?.value) {
      this.selectedSizes.push(this.sizeDatas.find((c) => c.id === size));
    }
    this.formProductDetail = [];
    for (let i = 0; i < this.products.length; i++) {
      this.formProductDetail[i] = this.formBuilder.group({
        ["id"]: [""],
        ["barCode"]: ["", Validators.required],
        ["quantity"]: ["", Validators.required],
      });
    }
  }
  deleteProductDetail(product) {
    this.products = this.products.filter((p) => p !== product);

    const { color, size } = product;
    const colorExists = this.products.some((p) => p.color === color);
    const sizeExists = this.products.some((p) => p.size === size);

    if (!colorExists) {
      this.formData.controls.colors.patchValue(
        this.formData.controls.colors.value.filter((v) => v !== color)
      );
      this.selectedColors = [];
      for (let color of this.formData.get("colors")?.value) {
        this.selectedColors.push(this.colorDatas.find((c) => c.id === color));
        this.imagesByColor[color] = [];
      }
    }

    if (!sizeExists) {
      this.formData.controls.sizes.patchValue(
        this.formData.controls.sizes.value.filter((v) => v !== size)
      );
      this.selectedSizes = [];
      for (let size of this.formData.get("sizes")?.value) {
        this.selectedSizes.push(this.sizeDatas.find((c) => c.id === size));
      }
    }
    this.formProductDetail = [];
    for (let i = 0; i < this.products.length; i++) {
      this.formProductDetail[i] = this.formBuilder.group({
        ["id"]: [""],
        ["barCode"]: ["", Validators.required],
        ["quantity"]: ["", Validators.required],
      });
    }
  }
  openImage(images: ProductImageResponse[], index: number): void {
    const albums = [];
    for (let i = 0; i < images.length; i++) {
      const src = "http://localhost:8080/image/" + images[i].urlImage;
      const caption = "Image " + i + " caption here";
      const thumb = "http://localhost:8080/image/" + images[i].urlImage;
      const album = {
        src,
        caption,
        thumb,
      };
      albums.push(album);
    }
    this.lightbox.open(albums, index);
  }

  columnsToDisplay = [
    "#",
    "product",
    "price",
    "weight",
    "form",
    "category",
    "design",
    "material",
    "sleeve",
    "collar",
    "status",
    "action",
  ];
  detailColumns = [
    "#",
    "barCode",
    "name",
    "quantity",
    "statusDetail",
    "actionDetail",
  ];
  expandedElement: ProductRespone | null;
  detailElement: ProductDetailRespone | null;
}
