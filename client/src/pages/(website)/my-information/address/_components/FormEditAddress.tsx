/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../../../common/contexts/AppContextProvider";
import useAddressMutation from "../../../../../common/hooks/address/useAddressMutation";
import { Iaddress } from "../../../../../common/interfaces/address";

type Props = {
  setIsOpenForm: any;
  address: Iaddress; // Tham số nhận thông tin địa chỉ cần cập nhật
};

const UpdateAddress = ({ setIsOpenForm, address }: Props) => {
  const addressMutation = useAddressMutation();
  const { register, handleSubmit, reset } = useForm<Iaddress>();
  const { location, currentUser } = useContext(AppContext);
  const [huyen, setHuyen] = useState<any[]>([]);
  const [xa, setXa] = useState<any[]>([]);

  useEffect(() => {
    reset(address);
    if (address.city) {
      const newDataTinh = location?.find(
        (item: any) => item.name === address.city
      );
      setHuyen(newDataTinh?.data2 || []);
    }
    if (address.district) {
      const newDataHuyen = huyen.find(
        (item: any) => item.name === address.district
      );
      setXa(newDataHuyen?.data3 || []);
    }
  }, [address, reset, location, huyen]);

  const onChangeTinh = (tinh: string) => {
    if (tinh !== "") {
      const newDataTinh = location?.find((item: any) => item.name === tinh);
      setHuyen(newDataTinh?.data2 || []);
    }
  };

  const onChangeHuyen = (data: string) => {
    if (data !== "") {
      const newDataHuyen = huyen.find((item: any) => item.name === data);
      setXa(newDataHuyen?.data3 || []);
    }
  };

  const onSubmit = (data: Iaddress) => {
    if (!currentUser || !currentUser._id) {
      console.error("Current user ID is not found");
      return;
    }

    const updatedData = {
      ...data,
      userId: currentUser._id,
      _id: address?._id, // Giữ lại ID của địa chỉ cũ để cập nhật
    };
    console.log("Updated data before mutation:", updatedData); 
    addressMutation.mutate({ action: "update", newAddress: updatedData });
    setIsOpenForm(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-white relative p-6 w-[320px] lg:w-[700px]"
      >
        <h2 className="text-2xl font-bold text-center uppercase">
          CẬP NHẬT ĐỊA CHỈ
        </h2>
        <span
          onClick={() => {
            setIsOpenForm(false);
          }}
          className="absolute cursor-pointer top-4 right-4"
        >
          <CloseOutlined />
        </span>
        <div className="flex flex-col items-center w-full gap-3 lg:justify-between lg:gap-5 lg:flex-row">
          <input
            type="text"
            {...register("fullname", { required: true })}
            placeholder="Họ tên"
            className="w-full px-5 py-3 text-base placeholder-black border rounded-md placeholder:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:w-1/2"
          />
          <input
            type="text"
            {...register("phone", { required: true })}
            placeholder="Số điện thoại"
            className="w-full px-5 py-3 text-base placeholder-black border rounded-md placeholder:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:w-1/2"
          />
        </div>
        <div className="flex flex-col items-center w-full gap-3 lg:gap-5 lg:flex-row lg:justify-between">
          <div className="relative w-full select-information">
            <select
              {...register("city", {
                required: true,
                onChange: (e) => onChangeTinh(e.target.value),
              })}
              className="w-full px-5 py-3 text-sm text-black border rounded-md appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base"
            >
              <option value={""} disabled>
                Tỉnh/Thành Phố
              </option>
              {location?.map((item: any, i: number) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full select-information">
            <select
              {...register("district", {
                required: true,
                onChange: (e) => onChangeHuyen(e.target.value),
              })}
              className="w-full px-5 py-3 text-sm text-black border rounded-md appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base"
            >
              <option value={""} disabled>
                Quận/Huyện
              </option>
              {huyen?.map((item: any, i: number) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative w-full select-information">
          <select
            {...register("ward", { required: true })}
            className="w-full px-5 py-3 text-sm text-black border rounded-md appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base"
          >
            <option value={""} disabled>
              Phường/Xã
            </option>
            {xa?.map((item: any, i: number) => (
              <option key={i} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            {...register("address", { required: true })}
            className="w-full px-5 py-3 placeholder-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:placeholder:text-base placeholder:text-sm"
            placeholder="Địa chỉ"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="checkdefault"
            {...register("isDefault")}
            className="accent-slate-950 size-5"
          />
          <label
            htmlFor="checkdefault"
            className="block text-sm cursor-pointer"
          >
            Đặt làm mặc định
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 font-semibold uppercase border btn-lg"
        >
          Cập nhật địa chỉ
        </button>
      </form>
    </div>
  );
};

export default UpdateAddress;
