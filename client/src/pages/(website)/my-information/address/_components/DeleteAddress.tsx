/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../../../../../common/contexts/AppContextProvider";
import useAddressMutation from "../../../../../common/hooks/address/useAddressMutation";
import { message } from "antd";

type Props = {
  setIsOpenDelete: any;
  addressId: string; // ID của địa chỉ cần xóa
};

const DeleteAddress = ({ setIsOpenDelete, addressId }: Props) => {
  const addressMutation = useAddressMutation();
  const { currentUser } = useContext(AppContext);

  const handleDelete = async () => {
    try {
      await addressMutation.mutateAsync({
        action: "delete",
        newAddress: {
            _id: addressId, userId: currentUser._id,
            fullname: "",
            city: "",
            ward: "",
            district: "",
            address: "",
            isDefault: false,
            phone: "",
            option: "house"
        },
      });
      setIsOpenDelete(false);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/30">
      <div className="flex flex-col gap-6 bg-white relative p-6 w-[320px] lg:w-[400px]">
        <h2 className="text-2xl font-bold text-center uppercase">
          XÓA ĐỊA CHỈ
        </h2>
        <span
          onClick={() => {
            setIsOpenDelete(false);
          }}
          className="absolute cursor-pointer top-4 right-4"
        >
          <CloseOutlined />
        </span>
        <p className="text-center">
          Bạn có chắc chắn muốn xóa địa chỉ này không?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md"
          >
            Xóa
          </button>
          <button
            onClick={() => setIsOpenDelete(false)}
            className="px-4 py-2 font-semibold text-white bg-gray-400 rounded-md"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddress;
