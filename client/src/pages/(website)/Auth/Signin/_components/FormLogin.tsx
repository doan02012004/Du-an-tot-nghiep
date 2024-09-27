/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../../../../services/auth'
import { AppContext } from '../../../../../common/contexts/AppContextProvider'

type FormLoginProps = {
    state: number | null,
    onChangeForm: (number: number) => void
}

type LoginFormInputs = {
    email: string,
    password: string
}

const FormLogin = ({ state, onChangeForm }: FormLoginProps) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 576)
    const formRef = useRef<any>()
    const { setAccesToken, setIsLogin } = useContext(AppContext)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>()

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 576) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        })
    }, [])

    useEffect(() => {
        if (isMobile) {
            if (state === 1) {
                formRef.current.style.height = formRef.current.scrollHeight + 'px'
            } else {
                formRef.current.style.height = 0
            }
        } else {
            formRef.current.style.height = 'auto'
        }
    }, [state, isMobile])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data: LoginFormInputs) => {
        const newUser = {
            email: data.email,
            password: data.password
        }
        loginUser(newUser, dispatch, navigate, setAccesToken, setIsLogin)
    }

    return (
        <div className="w-full lg:w-[480px]">
            {/* Desktop */}
            <span
                onClick={() => onChangeForm(1)}
                className="pb-3 text-base font-semibold cursor-pointer titles-auth lg:text-xl text-dark lg:cursor-auto lg:hidden"
            >
                Bạn đã có tài khoản
            </span>
            {/* Mobile */}
            <p className="hidden pb-3 text-base font-semibold lg:text-xl lg:cursor-auto lg:block">
                Bạn đã có tài khoản 
            </p>
            <div
                ref={formRef}
                className="h-0 overflow-hidden transition-all duration-300 ease-in-out contents-auth lg:block lg:overflow-visible lg:h-auto"
            >
                <p className="pb-7">
                    Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
                </p>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto lg:w-[390px]">
                    <div className="mb-3">
                        <input
                            type="text"
                            {...register('email', { required: 'Email không để trống' })}
                            placeholder="Email"
                            className="h-12 w-full mb-5 px-3 py-2 placeholder-#57585A text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        <input
                            type="password"
                            {...register('password', { required: 'Mật khẩu không được để trống' })}
                            placeholder="Mật khẩu"
                            className="h-12 w-full px-3 py-2 placeholder-#57585A text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    {/* Forgot Password */}
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <input type="checkbox" className="accent-slate-950" /> &nbsp;<span>Ghi nhớ mật khẩu</span>
                        </div>
                        <div><a href="#">Quên mật khẩu?</a></div>
                    </div>
                    <button className="h-12 w-full bg-[#221f20] text-[#f7f8f9] font-semibold rounded-tl-2xl rounded-br-2xl hover:bg-[#f7f8f9] hover:text-[#221f20] hover:border hover:border-[#221f20] transition ease-in-out">
                        ĐĂNG NHẬP
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormLogin
