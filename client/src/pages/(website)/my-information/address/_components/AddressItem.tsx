import { Popconfirm } from "antd";
import { Iaddress } from "../../../../../common/interfaces/address";
import useAddressMutation from "../../../../../common/hooks/address/useAddressMutation";
import UpdateAddress from "./FormEditAddress";
import { useState } from "react";

type Props = {
  address: Iaddress;
};

const AddressItem = ({ address }: Props) => {
  const addressMutation = useAddressMutation();
  const [isOpenForm, setIsOpenForm] = useState(false); // Control form open/close

  const handleDelete = () => {
    addressMutation.mutate({
      action: "delete",
      newAddress: {
        _id: address._id,
        userId: "",
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
  };

  // Function to open edit form
  const handleEdit = () => {
    setIsOpenForm(true); // Open form for editing
  };
  
  const onDefault = () =>{
    
  }

  return (
    <div className="w-full">
      <div className="border rounded-tl-[30px] rounded-br-[30px]">
        <div className="justify-between px-5 py-3 lg:py-5 lg:px-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold leading-7 text-black">
              {address?.fullname} {address.option === "house" ? "(Nhà riêng)" : "(Cơ quan)"}
            </span>
            <div className="flex items-center gap-3">
              <Popconfirm
                title="Bạn có chắc muốn xóa địa chỉ này?"
                onConfirm={handleDelete}
                okText="Có"
                cancelText="Không"
              >
                <button className="text-sm hover:underline">Xóa</button>
              </Popconfirm>
              <button className="text-sm hover:underline" onClick={handleEdit}>
                Sửa
              </button>
              {/* Show UpdateAddress form when isOpenForm is true */}
              {isOpenForm && (
                <UpdateAddress setIsOpenForm={setIsOpenForm} address={address} />
              )}
              <button
                onClick={onDefault}
                className={`${
                  address?.isDefault ? "bg-black text-white" : "bg-white text-black border-black"
                } border text-sm rounded-tl-[10px] rounded-br-[10px] px-3 py-2 hover:bg-white hover:text-black`}
              >
                MẶC ĐỊNH
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 leading-7">
            <span className="text-sm">Điện thoại: {address?.phone}</span>
            <span className="text-sm">
              Địa chỉ: {address?.district}, {address?.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
