import { useForm } from "react-hook-form"
import { forgotUser } from "../../../../../services/auth"
import { useNavigate } from "react-router-dom"


const FormAuth = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<any>()

    const onSubmit = async (data: any) => {
        const user = await forgotUser(data);
        if (user._id) {
            navigate("/wait")
        }
    }

    return (
        <div className="w-full lg:w-[480px]">
            <span
                className="titles-auth cursor-pointer text-base pb-3 lg:text-xl text-black font-semibold lg:cursor-auto lg:hidden"
            >
                Bạn muốn tìm lại mật khẩu?
            </span>
            {/* Mobile */}
            <p className="text-base hidden pb-3 lg:text-xl font-semibold lg:cursor-auto lg:block">
                Bạn muốn tìm lại mật khẩu?
            </p>
            <div
                className="contents-auth transition-all duration-300 ease-in-out h-0 overflow-hidden lg:block lg:overflow-visible lg:h-auto"
            >
                <p className="pb-7 text-sm">
                    Vui lòng nhập lại email đã đăng ký, hệ thống của chúng tôi sẽ gửi cho bạn 1 đường dẫn để thay đổi mật khẩu.
                </p>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto lg:w-[390px]">
                    <div className="mb-3">
                        <input
                            type="email"
                            {...register('email', { required: 'Email không để trống' })}
                            placeholder="Email"
                            className="h-12 w-full mb-5 px-3 py-2 placeholder-#57585A text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email?.message && (
                            <p className="text-red-500 text-red">{errors.email.message as string}</p>
                        )}
                    </div>
                    <button className="h-12 w-full bg-[#221f20] text-[#f7f8f9] font-semibold rounded-tl-2xl rounded-br-2xl hover:bg-[#f7f8f9] hover:text-[#221f20] hover:border hover:border-[#221f20] transition ease-in-out">
                        Gửi đi
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormAuth
