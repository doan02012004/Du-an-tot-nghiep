import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { forgotUser, resetPassword } from "../../../../../services/auth";

const FormAuth = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Get token from URL
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle email submission for password reset
    const onSubmitEmail = async (data: any) => {
        try {
            const user = await forgotUser(data);
            if (user._id) {
                navigate("/wait");
            }
        } catch (error) {
            setErrorMessage("Không thể gửi email, vui lòng thử lại.");
        }
    };

    // Handle password reset form submission
    const onSubmitPassword = async (data: any) => {
        console.log(data);

        try {
            const response = await resetPassword({ token, ...data });
            console.log("Token:", token);
            console.log("Data gửi đi:", data);
            if (response) {
                setSuccessMessage("Mật khẩu đã được thay đổi thành công!11");
                navigate("/signin");
            }
        } catch (error) {
            setErrorMessage("Không thể thay đổi mật khẩu, vui lòng thử lại.");
        }
    };

    return (
        <div className="w-full lg:w-[480px]">
            {!token ? (
                <>
                    <p className="text-base pb-3 lg:text-xl font-semibold">
                        Bạn muốn tìm lại mật khẩu?
                    </p>
                    <div className="contents-auth">
                        <p className="pb-7 text-sm">
                            Vui lòng nhập email đã đăng ký, hệ thống sẽ gửi cho bạn 1 đường dẫn để thay đổi mật khẩu.
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmitEmail)}
                            className="w-full mx-auto lg:w-[390px]"
                        >
                            <div className="mb-3">
                                <input
                                    type="email"
                                    {...register("email", { required: "Email không để trống" })}
                                    placeholder="Email"
                                    className="h-12 w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.email?.message && (
                                    <p className="text-red-500">{errors.email.message as string}</p>
                                )}
                            </div>
                            <button className="h-12 w-full bg-[#221f20] text-[#f7f8f9] font-semibold rounded hover:bg-[#f7f8f9] hover:text-[#221f20]">
                                Gửi đi
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-base pb-3 lg:text-xl font-semibold">
                        Đặt lại mật khẩu của bạn
                    </p>
                    <form
                        onSubmit={handleSubmit(onSubmitPassword)}
                        className="w-full mx-auto lg:w-[390px]"
                    >
                        <div className="mb-3">
                            <input
                                type="password"
                                {...register("password", { required: "Mật khẩu không để trống" })}
                                placeholder="Mật khẩu mới"
                                className="h-12 w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.password?.message && (
                                <p className="text-red-500">{errors.password.message as string}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                {...register("confirmPassword", { required: "Xác nhận mật khẩu không để trống" })}
                                placeholder="Xác nhận mật khẩu"
                                className="h-12 w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.confirmPassword?.message && (
                                <p className="text-red-500">{errors.confirmPassword.message as string}</p>
                            )}
                        </div>
                        <button className="h-12 w-full bg-[#221f20] text-[#f7f8f9] font-semibold rounded hover:bg-[#f7f8f9] hover:text-[#221f20]">
                            Đổi mật khẩu
                        </button>
                    </form>
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </>
            )}
        </div>
    );
};

export default FormAuth;
