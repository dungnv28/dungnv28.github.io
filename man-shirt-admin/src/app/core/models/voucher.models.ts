export class voucherResponse{
  id: number;
  name: string;
  startDate: Date;
  endDate:Date;
  description: string;
  status: number;
  discount: number;
  code:string;
}


export class voucherRequest{
  id: number;
  name: string;
  startDate: Date;
  endDate:Date;
  description: string;
  status: number;
  createTime: Date;
  updateTime: Date;
  createBy: string;
  updateBy: string;
  discount: number;
}
