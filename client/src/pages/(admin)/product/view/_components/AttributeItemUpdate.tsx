/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Form, InputNumber, message, Select } from "antd";
import { Iattribute, Iproduct } from "../../../../../common/interfaces/product";
import useAttributeMutation from "../../../../../common/hooks/products/useAttributeMutation";
import { DownOutlined } from "@ant-design/icons";
import { useEffect } from "react";

type AttributeItemProps = {
  data: Iattribute;
  product: Iproduct;
};
const AttributeItemUpdate = ({ data, product }: AttributeItemProps) => {
  const [form] = Form.useForm();
  const attributeMutation = useAttributeMutation();
  useEffect(() => {
    if (data && form) {
      form?.setFieldsValue(data);
    }
    
  }, [data, form]);

  const calculateVolume = () => {
    const height = form.getFieldValue("height");
    const width = form.getFieldValue("width");
    const length = form.getFieldValue("length");
    const currentVolume = form.getFieldValue("volume") || 0;
    if (height && width && length) {
      const volume = height * width * length;
      form.setFieldValue("volume", volume);
    } else {
      form.setFieldValue("volume", currentVolume);
    }
  };
  const onChangePriceNew: any = (priceNew: number) => {
    const priceOld = form.getFieldValue("price_old");
    console.log("Price old >", priceOld);
    if (priceNew > priceOld) {
      form.setFieldValue("price_new", 0);
      return message.error("Vui lòng không nhập cao hơn giá niêm yết");
    }
    if (priceOld) {
      const discount = Math.ceil(((priceOld - priceNew) / priceOld) * 100);
      form.setFieldValue("discount", discount);
    }
  };
  const onSubmit = (newAttribute: Iattribute) => {
    const newData = {
      ...newAttribute,
      size: data.size,
      color: data.color,
      _id: data._id,
    };
    attributeMutation.mutate({
      action: "updateAtb",
      productId: product._id,
      attribute: newData,
    });
  };
  return (
    <>
     <Dropdown
        trigger={['click']}
        placement="topLeft"
        dropdownRender={() => (
          <div className="p-3 border rounded-lg bg-white shadow-sm shadow-gray-600 mb-4">
            <h3 className='font-bold text-base mb-2 text-red'>{data?.color} , {data?.size}</h3>
            <Form
              layout="vertical"
              form={form}
              onFinish={onSubmit}
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
                <Form.Item
                  name="active"
                  label="Trạng thái"
                  className="col-span-3"
                >
                  <Select 
                  options={[
                    {
                      label:"Hoạt động",
                      value:true
                    },
                    {
                      label:"Không hoạt động",
                      value:false
                    }
                  ]}
                  />
                </Form.Item>
              </div>
                <Form.Item
                className="m-0 p-0"
                >
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Form.Item>
            </Form>
          
          </div>
        )}
      >
        <div className={` group flex justify-center items-center rounded-md border  p-3  cursor-pointer transition-all duration-300 ease-in-out hover:bg-indigo hover:text-white relative`}>
          <div className=" flex items-center w-full justify-between">
            <div className="flex items-center gap-x-3">
            <span className=" text-sm font-semibold"> {data?.color} ,</span>
             <span className="text-sm font-semibold"> {data?.size}</span> |
             <span className={`${data?.instock==0? 'text-red':'text-green-600'} text-sm font-semibold`}>{data.instock> 0?'Còn hàng':'Hết hàng'}</span>
            </div>
            <DownOutlined />
          </div>
          {!data?.active && (
            <div className=" absolute top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center">
            <span className="text-[#ea2c2c] font-semibold text-base">Ngừng hoạt động</span>
          </div>
          )}
        </div>
      </Dropdown>
    </>
  );
};

export default AttributeItemUpdate;
