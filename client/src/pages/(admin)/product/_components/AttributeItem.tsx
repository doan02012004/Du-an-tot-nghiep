/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Form, InputNumber, message } from "antd";
import { Iattribute } from "../../../../common/interfaces/product";
import { useDispatch, useSelector } from "react-redux";
import { setAttributes } from "../../../../common/redux/features/productSlice";
import {  DownOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";

type AttributeItemProps = {
  data: Iattribute;
  index: number;
};
const AttributeItem = ({ data, index }: AttributeItemProps) => {
  const [form] = Form.useForm();
  const attributes = useSelector((state: any) => state.product.attributes);
  const dispath = useDispatch();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form, index]);

  // Hàm tính thể tích
  const calculateVolume = () => {
    const height = form.getFieldValue("height");
    const width = form.getFieldValue("width");
    const length = form.getFieldValue("length");
    if (height && width && length) {
      form.setFieldValue("volume", height * width * length);
    } 
  };
  const onChangePriceNew: any = (priceNew: number) => {
    const priceOld = form.getFieldValue("price_old");
    if (priceNew > priceOld) {
      form.setFieldValue("price_new", 0);
      return message.error("Vui lòng không nhập cao hơn giá niêm yết");
    }
    if (priceOld) {
      const discount = Math.ceil(((priceOld - priceNew) / priceOld) * 100);
      form.setFieldValue("discount", discount);
    }
  };

  const onOpenForm = () => {
    const newData = { ...data, isCheck: false };
    const newAttributes = attributes.map((item: Iattribute, i: number) =>
      index == i ? newData : item
    );
    dispath(setAttributes(newAttributes));
  };
  const onSubmit = (newAttribute: Iattribute) => {
    const newData = {
      ...newAttribute,
      size: data.size,
      color: data.color,
      isCheck: true,
    };
    const newAttributes = attributes.map((item: Iattribute, i: number) =>
      index == i ? newData : item
    );
    dispath(setAttributes(newAttributes));
  };


  return (
    <>
      <Dropdown
        trigger={['click']}
        dropdownRender={() => (
          <div className="p-3 border rounded-lg bg-white shadow-sm shadow-gray-600 mb-4">
            <h3 className='font-bold text-base mb-2 text-red'>{data?.color} , {data?.size}</h3>
            <Form
              layout="vertical"
              form={form}
              onFinish={onSubmit}
              disabled={data?.isCheck}
            >
              <div className="grid grid-cols-12 gap-x-4">
                <Form.Item
                  name="price_old"
                  label="Giá niêm yết"
                  className="col-span-3"
                  rules={[{ required: true }, { type: "number", min: 1 }]}
                >
                  <InputNumber className="w-full" />
                </Form.Item>
                <Form.Item
                  name="price_new"
                  label="Giá khuyến mãi"
                  className="col-span-3"
                  rules={[{ required: true }, { type: "number", min: 1 }]}
                >
                  <InputNumber className="w-full" onChange={onChangePriceNew} />
                </Form.Item>
                <Form.Item
                  name="discount"
                  label="Giảm giá (%)"
                  className="col-span-3"
                  rules={[{ required: true }, { type: "number", min: 0 }]}
                >
                  <InputNumber className="w-full" disabled />
                </Form.Item>
                <Form.Item
                  name="weight"
                  label="Khối lượng (gram)"
                  className="col-span-3"
                  rules={[{ required: true }, { type: "number", min: 0 }]}
                >
                  <InputNumber className="w-full" />
                </Form.Item>
                <Form.Item
                  name="height"
                  label="Chiều cao (cm)"
                  className="col-span-3"
                  rules={[
                    { required: true, message: "Vui lòng nhập chiều cao" },
                    { type: "number", min: 0 },
                  ]}
                >
                  <InputNumber className="w-full" onBlur={calculateVolume} />
                </Form.Item>
                <Form.Item
                  name="width"
                  label="Chiều rộng (cm)"
                  className="col-span-3"
                  rules={[
                    { required: true, message: "Vui lòng nhập chiều rộng" },
                    { type: "number", min: 0 },
                  ]}
                >
                  <InputNumber className="w-full" onBlur={calculateVolume} />
                </Form.Item>
                <Form.Item
                  name="length"
                  label="Chiều dài (cm)"
                  className="col-span-3"
                  rules={[
                    { required: true, message: "Vui lòng nhập chiều dài" },
                    { type: "number", min: 0 },
                  ]}
                >
                  <InputNumber className="w-full" onBlur={calculateVolume} />
                </Form.Item>
                <Form.Item
                  name="volume"
                  label="Thể tích (cm³)"
                  className="col-span-3"
                  rules={[{ required: true }, { type: "number", min: 0 }]}
                >
                  <InputNumber className="w-full" disabled />
                </Form.Item>
                <Form.Item
                  name="instock"
                  label="SL kho"
                  className="col-span-3"
                  rules={[{ required: true }, { type: "number", min: 0 }]}
                >
                  <InputNumber className="w-full" placeholder="số lượng kho" />
                </Form.Item>
              </div>
              {!data?.isCheck && (
                <Form.Item
                className="m-0 p-0"
                >
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Form.Item>
              )}
            </Form>
            {data?.isCheck && (
              <Button onClick={onOpenForm} className="bg-red text-white">
                Chỉnh sửa <EditOutlined />
              </Button>
            )}
          </div>
        )}
      >
        <div className={`${data?.isCheck ? 'bg-green-400 border-yellow-700 text-white' : ''} group flex justify-center items-center rounded-md border  p-3  cursor-pointer transition-all duration-300 ease-in-out hover:bg-indigo hover:text-white`}>
          <div className=" flex items-center w-full justify-between">
            <div className="flex items-center gap-x-4">
              <div className=" flex items-center gap-x-1">
                <span className=" text-gray-600 font-normal text-xs group-hover:text-white">Màu:</span>
                <span className=" text-sm font-semibold"> {data?.color}</span>
              </div>
              <div className=" flex items-center gap-x-2">
                <span className="  text-gray-600 text-xs group-hover:text-white">Size:</span>
                <span className=" text-base"> {data?.size}</span>
              </div>
            </div>
            <DownOutlined />
          </div>
        </div>
      </Dropdown>
    </>

  );
};

export default AttributeItem;
