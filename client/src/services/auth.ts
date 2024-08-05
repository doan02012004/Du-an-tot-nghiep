/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../common/redux/features/authSlice";
import { Isignin, Isignup } from "../common/interface/auth";


export const loginUser = async (user: Isignin, dispatch: any, navigate: any) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", user)
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const registerUser = async (user: Isignup, dispatch: any, navigate: any) => {
    dispatch(registerStart());
    try {
        console.log("User data being sent:", user);
        await axios.post("http://localhost:5000/api/users/register", user)
        dispatch(registerSuccess())
        navigate('/signin')
    } catch (error) {
        dispatch(registerFailed())
    }
}