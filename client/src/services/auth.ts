/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../common/redux/features/authSlice";
import { Isignin, Isignup, Iuser } from "../common/interfaces/auth";
import instance from "../common/config/axios";
import { message } from "antd";

export const loginUser = async (user: Isignin, dispatch: any, navigate: any, setAccesToken: any, setIsLogin: any) => {
  dispatch(loginStart())
  try {
      const res = await instance.post("/users/login", user)
      dispatch(loginSuccess(res.data))
      setAccesToken(res.data.accessToken)
      setIsLogin(true)
      navigate("/")
  } catch (error) {
      dispatch(loginFailed())
  }
}

export const registerUser = async (
  user: Isignup,
  dispatch: any,
  navigate: any
) => {
  dispatch(registerStart());
  try {
    console.log("User data being sent:", user);
    await instance.post("/users/register", user);
    dispatch(registerSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const logoutUser = async () => {
  // dispatch(logoutStart());
  try {

      const data = await instance.post("/users/logout", {});
      // if (data.data.SC == 1) {
      //     setCurrentUser({});
      //     setIsLogin(false);
      //     setAccesToken(null);
      //     window.location.reload();
      // }
      // dispatch(logoutSuccess());
      return data.data
  } catch (error) {
      // console.error("Logout error:", error);
      return error
      // dispatch(logoutFailed());
  }
};
export const getAllUser = async () => {
  try {
    const { data } = await instance.get("/users");
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdUser = async (user: Iuser) => {
  try {
    const { data } = await instance.get(`/users/${user._id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const creatUser = async (user: Iuser) => {
  try {
    const { data } = await instance.post("/users/add", user);
    message.success("Thêm thành công");
    return data;
  } catch (error) {
    message.error("Thêm lỗi!");
    return error;
  }
};

export const updateUser = async (user: Iuser) => {
  try {
    const { data } = await instance.put(`/users/update/${user._id}`, user);
    message.success("Cập nhật thành công");
    return data;
  } catch (error) {
    message.error("Cập nhật lỗi!");
    return error;
  }
};
export const updateUserStatus = async (user: Iuser) => {
  try {
    const { data } = await instance.put(
      `/users/update/status/${user._id}`,
      user
    );
    message.success("Thay đổi trạng thái thành công");
    return data;
  } catch (error) {
    message.error("Cập nhật trạng thái lỗi!");
    return error;
  }
};
export const deleteUser = async (user: Iuser) => {
  try {
    const { data } = await instance.delete(`/users/delete/${user._id}`);
    message.success("Xoá thành công");
    return data;
  } catch (error) {
    message.error("Xoá lỗi!");
    return error;
  }
};
export const getNewToken = async () => {
  try {
      const { data } = await instance.post(`/users/token/refresh`)
      return data
  } catch (error) {
      console.log(error)
  }
}
export const getAccountUser = async () => {
  try {
      const { data } = await instance.get(`/users/getaccount/user`)
      return data
  } catch (error) {
      console.log(error)
  }
}
