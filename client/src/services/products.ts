/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import instance from "../common/config/axios";
import {
  Iattribute,
  Igallery,
  InewColor,
  InewSize,
  Iproduct,
  IproductInfor,
} from "../common/interfaces/product";
import { IColor } from "../common/interfaces/Color";

// -----------------------------------------------///
// Hàm lấy tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    const res = await instance.get("/products"); // Thay URL nếu cần thiết
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    throw error;
  }
};
export const getAllProductBySlug = async (categorySlug?: string) => {
  try {
    const res = await instance.get(`/products/category/${categorySlug}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//----------------------------------------------------///
export const getProductSlider = async (options: any) => {
    try {
      const res = await instance.get("/products/slider", {
        params: options,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  export const getProductSimilar = async (param:any) => {
    try {
      const res = await instance.get("/products/similar", {
        params: param,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const getProducts = async (dataFilter:any) => {
  try {
    const res = await instance.get(`/products`,{params:dataFilter})
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const getProductsByFilter = async(dataFilter : {} | undefined)=> {
//     try {
//         console.log(dataFilter)
//         // const res = await instance.get(`products/filter?${dataFilter}`)
//         // return res.data
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }

export const getProductBySlug = async (slug: string) => {
  try {
    const res = await instance.get(`/products/${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const addProduct = async (product?: Iproduct) => {
  try {
    const res = await instance.post("/products", product);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (productId: string | number | undefined) => {
  try {
    const res = await instance.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    message.error("Xóa san pham thất bại!");
  }
};

export const updateProductInfor = async (productInfor?: IproductInfor) => {
  try {
    const res = await instance.put(
      `/products/updateInfor/${productInfor?._id}`,
      productInfor
    );
    message.success("Cập nhật thông tin thành công");
    return res.data;
  } catch (error) {
    console.log(error);
    message.error("Cập nhật thông tin thất bại");
  }
};

export const updateProductGallery = async (
  productId: string | number,
  gallery: Igallery
) => {
  try {
    const res = await instance.put(
      `/products/updateGallery/${productId}`,
      gallery
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateProductAttribute = async (
  productId: string | number,
  attribute: Iattribute
) => {
  try {
    const res = await instance.put(
      `/products/updateAtb/${productId}`,
      attribute
    );
    message.success("Cập nhật thuộc tính thành công");
    return res;
  } catch (error) {
    console.log(error);
    message.error("Cập nhật số lượng thất bại");
  }
};

export const addSizeProduct = async (
  productId: string | number,
  newSize: InewSize
) => {
  try {
    const res = await instance.put(`/products/addSizes/${productId}`, newSize);
    message.success("Thêm size thành công!");
    return res.data;
  } catch (error) {
    console.log(error);
    message.error("Thêm size thất bại!");
  }
};
export const addColorProduct = async (
  productId: string | number,
  newColor: InewColor
) => {
  try {
    const res = await instance.put(
      `/products/addColors/${productId}`,
      newColor
    );
    message.success("Thêm màu sắc thành công!");
    return res.data;
  } catch (error) {
    console.log(error);
    message.error("Thêm màu sắc thất bại!");
  }
};
export const deleteColorProduct = async (
  productId: string | number,
  color: IColor
) => {
  try {
    const res = await instance.put(`/products/deleteColor/${productId}`, color);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSizeProduct = async (
  productId: string | number,
  size: string
) => {
  const option = {
    size: size,
  };
  try {
    const res = await instance.put(`/products/deleteSize/${productId}`, option);
    return res.data;
  } catch (error) {
    console.log(error)
  }
};

export const addItemsGallery = async(option:{productId:string|number,galleryId:string|number,imageUrl:string|number})=>{
  try {
    const res = await instance.put('/products/gallerys/add',option)
    return res
  } catch (error) {
    return error
  }
}

export const deleteImageGallery = async(option:{productId:string|number,galleryId:string|number,imageUrl:string|number})=>{
  try {
    const res = await instance.put('/products/delete/image',option)
    return res
  } catch (error) {
    return error
  }
}
