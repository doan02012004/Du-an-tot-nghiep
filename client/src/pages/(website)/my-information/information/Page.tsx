/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd'
import  { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/auth'
import {  LoadingOutlined } from '@ant-design/icons'
import { AppContext } from '../../../../common/contexts/AppContextProvider'
import moment from 'moment'

const Account = () => {
  const {register,handleSubmit,formState:{errors},reset} = useForm()
  const {currentUser} = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const onChangePassword = async(data:any) =>{
      setLoading(true)
        const {currentPassword,newPassword,confirmNewPassword} = data
        if(newPassword !==confirmNewPassword){
          setLoading(false)
          message.error('Mật khẩu không trùng khớp !')
          return
        }

        try {
            const data = await changePassword({currentPassword,newPassword}) as any
            setLoading(false)
           if(data.status == 200){
            message.success(data.data.message)
            reset()
            setIsOpen(false)
           }else{
            message.error("Cập nhật thất bại")
           }
        } catch (error) {
          setLoading(false)
          console.log(error)
        }
    }
  return (
   <>
      <div className="w-full">
        <h1 className="uppercase font-semibold text-lg mb-4 lg:text-2xl text-dark lg:mb-8">Tài khoản của tôi</h1>
        <div className="flex flex-col lg:gap-x-4 lg:flex-row">
            {/* Form  */}
          <form className="order-2 mb-5 w-full lg:basis-4/6 lg:flex-shrink-0 lg:order-1 lg:mb-0">
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Họ</div>
              <input type="text" value={currentUser?.lastname} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled />
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <div className="w-[170px]  font-light text-dark text-sm flex-shrink-0">Tên</div>
              <input type="text" value={currentUser?.firstname} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled />
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Số điện thoại</div>
              <input type="text" value={currentUser?.phone} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled />
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Email</div>
              <input type="text" defaultValue={currentUser?.email} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled />
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Giới tính</div>
              <div className="flex items-center gap-x-8">
                <div className="flex items-center gap-x-2">
                  <input type="radio" id="nam" className="accent-slate-950 size-5" defaultChecked={currentUser?.gender == 'male'?true:false} name="gender" value={'male'} disabled/>
                  <label htmlFor="nam" className="block cursor-pointer text-dark font-semibold text-sm">Nam</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input type="radio" id="nu" className="accent-slate-950 size-5" defaultChecked={currentUser?.gender == 'female'?true:false} name="gender" value={'female'} disabled/>
                  <label htmlFor="nu" className="block cursor-pointer text-dark font-semibold text-sm">Nữ</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input type="radio" id="khac" className="accent-slate-950 size-5" defaultChecked={currentUser?.gender == 'other'?true:false} name="gender" value={'other'} disabled/>
                  <label htmlFor="khac" className="block cursor-pointer text-dark font-semibold text-sm">Khác</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Ngày sinh</div>
              <input type="text" defaultValue={moment(currentUser?.date).format('DD/MM/YYYY')} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled />
            </div>
            <div className=" flex items-center w-max mx-auto">
              <button type="submit" className="border mr-4 border-dark rounded-tl-2xl bg-dark rounded-br-2xl text-white px-6 py-3 hover:bg-white hover:text-dark transition duration-300 ease-in-out">Cập nhật</button>
              <button onClick={(e)=>{setIsOpen(true);e.preventDefault()}} className="btn-changePass border border-dark rounded-tl-2xl bg-white rounded-br-2xl text-dark px-6 py-3 hover:bg-dark hover:text-white transition duration-300 ease-in-out">Đổi mật khẩu</button>
            </div>
          </form>
          {/* Table chiết khấu  */}
          <table className="order-1 mb-4 border-collapse border border-slate-400 max-h-[170px] w-full lg:mb-0 lg:order-2">
            <tbody>
              <tr>
                <td className="border border-slate-300 text-center text-sm lg:text-base">Điểm chiết khấu</td>
                <td className="border border-slate-300 text-center text-dark font-semibold text-sm lg:text-base ">0</td>
              </tr>
              <tr>
                <td className="border border-slate-300 text-center text-sm lg:text-base">Chiết khấu</td>
                <td className="border border-slate-300 text-center text-dark font-semibold text-sm lg:text-base">0%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 text-center text-sm lg:text-base">Hạn thẻ</td>
                <td className="border border-slate-300 text-center text-dark font-semibold text-sm lg:text-base">04/07/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* đổi mật khẩu  */}
     {isOpen && (
         <div className="formChangePass  fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[51]">
         <div className="relative w-full h-full">
           <div className="bg-black/70 w-full h-full" />
           <form onSubmit={handleSubmit(onChangePassword)} className="absolute max-w-[800px] w-[320px] p-[30px] bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:w-full">
             <div className="relative w-full h-full mb-4 lg:mb-6 ">
               <h1 className="font-semibold text-3xl text-dark uppercase text-center">Đổi mật khẩu</h1>
               <span onClick={()=>{setIsOpen(false);reset()}} className="closeFormChangePass cursor-pointer absolute -top-9 -right-7 lg:-right-4 lg:-top-8 text-2xl p-3 hover:text-dark">x</span>
             </div>
             <div className="w-full mb-6">
               <label className="text-sm">Mật khẩu hiện tại</label>
               <input type="password" {...register("currentPassword",{required:true,minLength:6})} className="w-full p-[15px] text-sm border border-gray-200 rounded" />
               {errors.currentPassword &&errors.currentPassword?.type =='required' && (<p className='text-red text-sm'>Vui lòng điền thông tin</p>) }
               {errors.currentPassword &&errors.currentPassword?.type =='minLength' && (<p className='text-red text-sm'>Ít nhất 6 ký tự</p>) }
             </div>
             <div className="w-full mb-6">
               <label className="text-sm">Mật khẩu mới</label>
               <input type="password"  {...register("newPassword",{required:true,minLength:6})} className="w-full p-[15px] text-sm border border-gray-200 rounded" />
               {errors.newPassword &&errors.newPassword?.type =='required' && (<p className='text-red text-sm'>Vui lòng điền thông tin</p>) }
               {errors.newPassword &&errors.newPassword?.type =='minLength' && (<p className='text-red text-sm'>Ít nhất 6 ký tự</p>) }
             </div>
             <div className="w-full mb-6">
               <label className="text-sm">Nhập lại mật khẩu mới</label>
               <input type="password" {...register("confirmNewPassword",{required:true,minLength:6})} className="w-full p-[15px] text-sm border border-gray-200 rounded" />
               {errors.confirmNewPassword &&errors.confirmNewPassword?.type =='required' && (<p className='text-red text-sm'>Vui lòng điền thông tin</p>) }
               {errors.confirmNewPassword &&errors.confirmNewPassword?.type =='minLength' && (<p className='text-red text-sm'>Ít nhất 6 ký tự</p>) }
             </div>
             <button type="submit" className=" w-full py-4 rounded-tl-2xl rounded-br-2xl bg-dark border-x border-black text-white hover:bg-white hover:text-dark">{loading?<LoadingOutlined />:'Cập nhật'}</button>
           </form>
         </div>
       </div>
     )}
   </>
  )
}

export default Account