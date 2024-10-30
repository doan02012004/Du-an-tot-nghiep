import { PlusCircleFilled } from "@ant-design/icons"
import AddressItem from "./_components/AddressItem"
import FormAddress from "./_components/FormAddress"
import useAddressQuery from "../../../../common/hooks/address/useAddressQuery"
import { Iaddress } from "../../../../common/interfaces/address"
import { useState } from "react"

const AddressList = () => {
  const [isOpenForm,setIsOpenForm] = useState(false)
  const addressQuery = useAddressQuery()

  return (
    <div className="w-full">
        {/* Header start  */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-b-gray-200">
            <h2 className="text-xl font-semibold text-black lg:text-2xl">Sổ địa chỉ</h2>
            <button onClick={()=>{setIsOpenForm(true)}} className="px-4 py-2 font-medium text-white border btn-sm bg-dark hover:text-black hover:bg-white"><PlusCircleFilled /> Thêm địa chỉ </button>
           {isOpenForm && (
             <FormAddress setIsOpenForm={setIsOpenForm} />
           )}
        </div>
        {/* Header end  */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            {addressQuery?.data?.map((item:Iaddress)=>(
              <AddressItem key={item._id} address={item} />
            ))}
        </div>
    </div>
  )
}

export default AddressList