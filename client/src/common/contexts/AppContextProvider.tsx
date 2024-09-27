/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from 'antd'
import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import instance from '../config/axios'
import { getAccountUser, getNewToken } from '../../services/auth'
import useLocalStorage from '../hooks/localstorage/useLocalStorage'
import useApiLocationQuery from '../hooks/API_location/useApiLocationQuery'
import { io } from 'socket.io-client'

type AppContextProviderProps = {
  children: ReactNode
}

const fetchUser = async (setCurrentUser?: any, setIsLogin?: any, setIsLoading?: any) => {
  setIsLoading(true)
  try {
    const user = await getAccountUser()

    if (user) {
      setCurrentUser(user)
      setIsLogin(true)

    }
    setIsLoading(false)
  } catch (error) {
    setCurrentUser(null)
    setIsLogin(false)
    setIsLoading(false)
    console.log(error)
  }
}
export const AppContext = createContext<any>(null)

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [choiceColor, setChoiceColor] = useState('')
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage('tt_user', {})
  const [isLoading, setIsLoading] = useState(false)
  const locationQuery = useApiLocationQuery()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [accessToken, setAccesToken] = useLocalStorage('accessToken', null)
  const [isLogin, setIsLogin] = useLocalStorage('login', null)
  const [location, setLocation] = useLocalStorage('location', null)
  const socket: any = useRef(null)
  // Interceptor request axios
  useEffect(() => {
    // Thêm một request interceptor
    const requestInterceptor = instance.interceptors.request.use(function (config: any) {
      // // lệnh thực thi trước khi gửi đi 1 request
      //  console.log("accessToken Rq >> :",accessToken)
      config.headers.Authorization = !config._retry && accessToken ? `Bearer ${accessToken}` : config.headers.Authorization;
      return config;
    }, function (error) {
      // lệnh thực thi này bị lỗi
      return Promise.reject(error);
    });
    return () => {
      instance.interceptors.request.eject(requestInterceptor)
    }
  }, [accessToken])

  // Interceptor response axios
  useEffect(() => {
    // Add a response interceptor
    const responseInterceptors = instance.interceptors.response.use(function (response) {
      return response;
    }, async function (error) {
      const originalRequest = error.config;
      if (error.response?.data?.EC === 1) {
        setAccesToken(null)
        setIsLogin(false)
        setCurrentUser(null)
      }
      else if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // gọi api để refeshToken
          const data = await getNewToken()
          setAccesToken(data.accessToken)
          // // Cập nhật accessToken mới vào localStorage hoặc state
          instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          // Cập nhật lại accessToken trong header của request cũ và thử lại request
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (error) {
          console.error('Unable to refresh access token:', error);
          setAccesToken(null)
          // Nếu refresh token cũng hết hạn, logout và redirect đến trang login
          // window.location.href = '/signin';
          // next.js
          // nest.js
        }
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

    return () => {
      instance.interceptors.response.eject(responseInterceptors)
    }
  }, [])

  // get user
  useEffect(() => {
    if (accessToken || accessToken == undefined) {
      fetchUser(setCurrentUser, setIsLogin, setIsLoading)
    } else {
      setIsLogin(false)
      setCurrentUser({})
      console.log('logout fail')
    }
  }, [accessToken])

  //set địa chỉ 
  useEffect(() => {
    if (locationQuery.data) {
      setLocation(locationQuery.data)
    }
  }, [locationQuery.data])


  // kết nối socket
  useEffect(() => {
    socket.current = io('http://localhost:8000')
  }, [])

  // useEffect(() => {
  //   // if (socket.current) {
  //   //   socket.current.emit('addUser', currentUser._id)
  //   // }
  //   socket.current.on('welcome', (data: any) => {
  //     console.log(data)
  //   })
  // }, [socket.current])
  return (
    <AppContext.Provider value={{ collapsed, setCollapsed, colorBgContainer, borderRadiusLG, accessToken, setAccesToken, setIsLogin, isLogin, isLoading, currentUser, setCurrentUser, choiceColor, setChoiceColor, location }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider