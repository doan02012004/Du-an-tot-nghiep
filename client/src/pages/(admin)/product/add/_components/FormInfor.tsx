/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputRef,
  message,
  Select,
  Space,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useCategoryQuery from "../../../../../common/hooks/categories/useCategoryQuery";
import { ICategories } from "../../../../../common/interfaces/categories";
import useCategoryMutation from "../../../../../common/hooks/categories/useCategoryMutation";
import { useDispatch, useSelector } from "react-redux";
import {
  SetIsSave,
  setProductInfor,
} from "../../../../../common/redux/features/productSlice";
import { Iproduct } from "../../../../../common/interfaces/product";
import useBrandQuery from "../../../../../common/hooks/brands/useBrandQuery";
import useBrandMutation from "../../../../../common/hooks/brands/useBrandMutation";
import { IBrands } from "../../../../../common/interfaces/brands";
const FormInfor = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const inputRef = useRef<InputRef>(null);
  const brandRef = useRef<InputRef>(null);
  const categoriesQuery = useCategoryQuery();
  const categoriesMutation = useCategoryMutation();
  const brandsQuery = useBrandQuery();
  const brandsMutation = useBrandMutation();
  const productInfor = useSelector((state: any) => state.product.productInfor);
  const isSave = useSelector((state: any) => state.product.isSave);
  const dispath = useDispatch();
  useEffect(() => {
    form.setFieldsValue(productInfor);
  }, [productInfor, form]);
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (name == "") {
      message.error("Vui lòng nhập dữ liệu !");
    } else {
      categoriesMutation.mutate({
        action: "add",
        category: {
          name: name,
          slug: ""
        },
        isOther: true,
      });
      setName("");
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const addBrand = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (brand == "") {
      message.error("Vui lòng nhập dữ liệu !");
    } else {
      brandsMutation.mutate({
        action: "add",
        brand: { name: brand },
        isOther: true,
      });
      setBrand("");
    }
    setTimeout(() => {
      brandRef.current?.focus();
    }, 0);
  };
  const onSubmit = async (data: Iproduct) => {
    dispath(setProductInfor(data));
    dispath(SetIsSave(true));
    message.success("Bạn đã lưu thay đổi !");
  };
  return (
    <div>
      <div className="px-5">
        <Form
          form={form}
          name="basic"
          className="p-0 m-0"
          layout="vertical"
          onFinish={onSubmit}
          disabled={isSave}
        >
          <div>
            {/* Thông tin  */}
            <div className="grid grid-cols-2 gap-x-4">
              <Form.Item
                label="Tên sản phẩm"
                name={"name"}
                rules={[{ required: true, message: "Bắt buộc nhập" }]}
              >
                <Input placeholder="Nhập tên sản phẩm..." />
              </Form.Item>
              <Form.Item
                label="Danh mục sản phẩm"
                name="categoryId"
                rules={[{ required: true, message: "Bắt buộc nhập" }]}
              >
                <Select
                  loading={
                    categoriesQuery.isLoading
                      ? categoriesQuery.isLoading
                      : categoriesMutation.isPending
                  }
                  placeholder="Chọn danh mục"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                          placeholder="Thêm danh mục"
                          ref={inputRef}
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        >
                          Thêm
                        </Button>
                      </Space>
                    </>
                  )}
                  options={categoriesQuery?.data?.map((item: ICategories) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Thương hiệu"
                name="brandId"
                rules={[{ required: true, message: "Bắt buộc nhập" }]}
              >
                <Select
                  loading={
                    brandsQuery.isLoading
                      ? brandsQuery.isLoading
                      : brandsMutation.isPending
                  }
                  placeholder="Chọn thương hiệu"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                          placeholder="Please enter item"
                          ref={brandRef}
                          value={brand}
                          onChange={(event) => setBrand(event.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addBrand}
                        >
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={brandsQuery?.data?.map((item: IBrands) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name={"gender"}
                rules={[{ required: true, message: "Bắt buộc nhập" }]}
              >
                <Select
                  placeholder='Chọn giới tính'
                  options={[
                    { label: "Nam và Nữ", value:'unisex' },
                    { label: "Nam", value: 'male' },
                    { label: "Nữ", value: 'female' },
                  ]} />
              </Form.Item>
              <Form.Item
                label="Nổi bật"
                name={"featured"}
                className="basis-1/2"
              >
                <Select
                  defaultValue={false}
                  options={[
                    { label: "Có", value: true },
                    { label: "Không", value: false },
                  ]} />
              </Form.Item>
              <Form.Item
                label="Hoạt động"
                name={"active"}
                className="basis-1/2"
              >
                <Select
                  defaultValue={true}
                  options={[
                    { label: "Có", value: true },
                    { label: "Không", value: false },
                  ]} />
              </Form.Item>
            </div>
            {/* Mô tả  */}
            <div className="w-full mx-auto py-0">
              <Form.Item label="Mô tả sản phẩm" name={"description"}>
                <ReactQuill placeholder="Nhập mô tả sản phẩm..." className="w-full" />
              </Form.Item>
            </div>
            {!isSave && (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <SaveOutlined />
                  Lưu thông tin
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
        {isSave && (
          <div className="w-full">
            <Button
              onClick={() => dispath(SetIsSave(false))}
              className="text-white bg-yellow"
            >
              <EditOutlined />
              Chỉnh sửa thông tin
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInfor;
