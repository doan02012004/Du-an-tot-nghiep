
export const formatPrice = (price: number) =>{
    return price.toLocaleString('vi-VN')
}

export const priceNew = (priceOld:number,discount:number) =>{
    const newPrice = priceOld - (priceOld * discount / 100)
    return newPrice
}
export const slugify = (name:string) => {
    return name
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w\-]+/g, '')   // Xóa các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
      .replace(/\-\-+/g, '-')      // Thay nhiều dấu gạch ngang liên tiếp bằng 1
      .replace(/^-+/, '')          // Xóa dấu gạch ngang đầu
      .replace(/-+$/, '');         // Xóa dấu gạch ngang cuối
  }