import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;

  transactions;

  constructor() {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Đơn hàng" },
      { label: "Danh sách", active: true },
    ];

    this.transactions = [
      {
        id: "#SK2540",
        name: "Vũ Tiến Long",
        date: "12/06/2023 8:00 AM",
        total: "538,000đ",
        status: "Đã thanh toán",
        statusOrder: "Đang giao",
        payment: ["fab fa-cc-mastercard", "Mastercard"],
        index: 1,
      },
      {
        id: "#SK2539",
        name: "Nguyễn Thị Linh",
        date: "12/06/2023 6:30 AM",
        total: "538,000đ",
        status: "Chưa thanh toán",
        statusOrder: "Chờ duyệt",
        payment: ["fab fa-cc-mastercard", "Thanh toán khi nhận hàng"],
        index: 1,
      },
    ];
    this.orders = this.transactions;
  }
  orders: any[];
  getOrder(i: number) {
    this.orders = [];
    if (i === 3) {
      this.orders.push(
        this.transactions.find((c) => c.statusOrder === "Đang giao")
      );
    } else if (i === 1) {
      this.orders = this.transactions;
    } else if (i === 2) {
      // this.orders.push(
      //   this.transactions.find((c) => c.statusOrder === "Đã giao hàng")
      // );
      this.orders = [];
    } else if (i === 4) {
      // this.orders.push(
      //   this.transactions.find((c) => c.statusOrder === "Hoàn trả")
      // );
      this.orders = [];
    } else if (i === 5) {
      // this.orders.push(
      //   this.transactions.find((c) => c.statusOrder === "Đã hủy")
      // );
      this.orders = [];
    } else if (i === 6) {
      this.orders.push(
        this.transactions.find((c) => c.statusOrder === "Chờ duyệt")
      );
    }
  }
}
