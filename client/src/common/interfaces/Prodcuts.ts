export interface IProduct {
  _id: number;
  name: string;
  price_old: number;
  description: string;
  categoryId: string;
  active: boolean; //hoạt đông tình trang hiện tại của đơn hàng
  featured: boolean; //nổi bật
  discount: number; // giảm giá
  key?: number | string;
}
