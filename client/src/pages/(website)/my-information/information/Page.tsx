import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import useUserMutation from '../../../../common/hooks/users/useUserMutation';
import moment from 'moment';

const Account = () => {
  const [isForm1Open, setIsForm1Open] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AppContext); // Lấy dữ liệu người dùng từ context
  const { register, setValue, handleSubmit } = useForm();

  // Lấy hook mutation để xử lý cập nhật thông tin người dùng
  const mutation = useUserMutation();

  // Sử dụng useEffect để tự động điền dữ liệu vào form khi `currentUser` có giá trị
  useEffect(() => {
    if (currentUser) {
      setValue('lastname', currentUser.lastname);
      setValue('firstname', currentUser.firstname);
      setValue('phone', currentUser.phone);
      setValue('email', currentUser.email);
      setValue('gender', currentUser.gender);
      setValue('birthday', moment(currentUser.date).format('YYYY-MM-DD'));
    }
  }, [currentUser, setValue]);

  // Hàm submit form để gọi API cập nhật thông tin người dùng
  const onSubmit = (data: any) => {
    mutation.mutate({
      action: 'update',
      user: { ...data, _id: currentUser._id }, // Thêm ID người dùng vào dữ liệu
    });
  };

  return (
    <>
      <div className="w-full">
        <h1 className="uppercase font-semibold text-lg mb-4 lg:text-2xl text-dark lg:mb-8">Tài khoản của tôi</h1>
        <div className="flex flex-col lg:gap-x-4 lg:flex-row">
          {/* Form  */}
          <form className="order-2 mb-5 w-full lg:basis-4/6 lg:flex-shrink-0 lg:order-1 lg:mb-0">
            <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                Họ
              </label>
              <input
                type="text"
                {...register("lastname", { required: true })}
                className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled
              />
            </div>
            <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                Tên
              </label>
              <input
                type="text"
                {...register("firstname", { required: true })}
                className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                disabled />
            </div>
            <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                Số điện thoại
              </label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                disabled />
            </div>
            <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                disabled />
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Giới tính</div>
              <div className="flex items-center gap-x-8">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="male"
                    {...register("gender", { required: true })}
                    value="male"
                    className="accent-slate-950 size-5"
                  />
                  <label htmlFor="male" className="block cursor-pointer text-dark font-semibold text-sm">
                    Nam
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="female"
                    {...register("gender", { required: true })}
                    value="female"
                    className="accent-slate-950 size-5"
                  />
                  <label htmlFor="female" className="block cursor-pointer text-dark font-semibold text-sm">
                    Nữ
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    id="other"
                    {...register("gender", { required: true })}
                    value="other"
                    className="accent-slate-950 size-5"
                  />
                  <label htmlFor="other" className="block cursor-pointer text-dark font-semibold text-sm">
                    Khác
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
              <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Ngày sinh</div>
              <input type="date"
                {...register("birthday", { required: true })} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" disabled />
            </div>
            <div className=" flex items-center w-max mx-auto">
              <button onClick={(e) => { setIsForm1Open(true); e.preventDefault() }} className="border mr-4 border-dark rounded-tl-2xl bg-dark rounded-br-2xl text-white px-6 py-3 hover:bg-white hover:text-dark transition duration-300 ease-in-out">Cập nhật</button>
              <button onClick={(e) => { setIsOpen(true); e.preventDefault() }} className="btn-changePass border border-dark rounded-tl-2xl bg-white rounded-br-2xl text-dark px-6 py-3 hover:bg-dark hover:text-white transition duration-300 ease-in-out">Đổi mật khẩu</button>
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

      {/* cập nhật tài khoản  */}
      {isForm1Open && (
        <div className="formChangePass fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[51]">
          <div className="relative w-full h-full">
            <div className="bg-black/70 w-full h-full" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute max-w-[800px] w-[320px] p-[30px] bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:w-full"
            >
              <div className="relative w-full h-full mb-4 lg:mb-6">
                <h1 className="font-semibold text-3xl text-dark uppercase text-center">
                  Cập nhật tài khoản
                </h1>
                <span
                  onClick={() => setIsForm1Open(false)}
                  className="closeFormChangePass cursor-pointer absolute -top-9 -right-7 lg:-right-4 lg:-top-8 text-2xl p-3 hover:text-dark"
                >
                  x
                </span>
              </div>
              <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
                <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                  Họ
                </label>
                <input
                  type="text"
                  {...register("lastname", { required: true })}
                  className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                />
              </div>
              <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
                <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                  Tên
                </label>
                <input
                  type="text"
                  {...register("firstname", { required: true })}
                  className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                />
              </div>
              <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
                <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                />
              </div>
              <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
                <label className="w-[170px] font-light text-dark text-sm flex-shrink-0">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200"
                />
              </div>
              <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:mb-6">
                <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Giới tính</div>
                <div className="flex items-center gap-x-8">
                  <div className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      id="male"
                      {...register("gender", { required: true })}
                      value="male"
                      className="accent-slate-950 size-5"
                    />
                    <label htmlFor="male" className="block cursor-pointer text-dark font-semibold text-sm">
                      Nam
                    </label>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      id="female"
                      {...register("gender", { required: true })}
                      value="female"
                      className="accent-slate-950 size-5"
                    />
                    <label htmlFor="female" className="block cursor-pointer text-dark font-semibold text-sm">
                      Nữ
                    </label>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      id="other"
                      {...register("gender", { required: true })}
                      value="other"
                      className="accent-slate-950 size-5"
                    />
                    <label htmlFor="other" className="block cursor-pointer text-dark font-semibold text-sm">
                      Khác
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  mb-4 lg:flex-row lg:items-center lg:justify-between lg:mb-6">
                <div className="w-[170px] font-light text-dark text-sm flex-shrink-0">Ngày sinh</div>
                <input type="date"
                  {...register("birthday", { required: true })} className="border text-sm text-dark font-semibold p-[15px] w-full rounded disabled:bg-gray-200" />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-tl-2xl rounded-br-2xl bg-dark border-x border-black text-white hover:bg-white hover:text-dark"
              >
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      )}

      {/* đổi mật khẩu  */}
      {isOpen && (
        <div className="formChangePass  fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[51]">
          <div className="relative w-full h-full">
            <div className="bg-black/70 w-full h-full" />
            <form className="absolute max-w-[800px] w-[320px] p-[30px] bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:w-full">
              <div className="relative w-full h-full mb-4 lg:mb-6 ">
                <h1 className="font-semibold text-3xl text-dark uppercase text-center">Đổi mật khẩu</h1>
                <span onClick={() => { setIsOpen(false) }} className="closeFormChangePass cursor-pointer absolute -top-9 -right-7 lg:-right-4 lg:-top-8 text-2xl p-3 hover:text-dark">x</span>
              </div>
              <div className="w-full mb-6">
                <label className="text-sm">Mật khẩu hiện tại</label>
                <input type="password" name='' className="w-full p-[15px] text-sm border border-gray-200 rounded" />
              </div>
              <div className="w-full mb-6">
                <label className="text-sm">Mật khẩu mới</label>
                <input type="password" name='' className="w-full p-[15px] text-sm border border-gray-200 rounded" />
              </div>
              <div className="w-full mb-6">
                <label className="text-sm">Nhập lại mật khẩu mới</label>
                <input type="password" name='' className="w-full p-[15px] text-sm border border-gray-200 rounded" />
              </div>
              <button type="submit" className=" w-full py-4 rounded-tl-2xl rounded-br-2xl bg-dark border-x border-black text-white hover:bg-white hover:text-dark">Cập nhật</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Account