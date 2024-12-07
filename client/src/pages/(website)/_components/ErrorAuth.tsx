import { CloseCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'


const ErrorAuth = () => {
    const onReload = () => {
        window.location.reload()
    }
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900/40 flex justify-center items-center z-[100]'>
            <div className='max-w-[400px] w-full p-4 rounded-lg shadow shadow-black bg-white'>
                <div className='w-full flex justify-center items-center'>
                    <CloseCircleOutlined className='text-red text-6xl w-max mx-auto mb-5' />
                </div>
                <p className='text-lg text-black mb-4 w-max mx-auto'>Tài khoản của bạn đã bị hạn chế </p>
                <div className='w-full flex justify-center items-center'>
                    <Button type='primary' danger onClick={onReload} className='w-max mx-auto'>Đồng ý</Button>
                </div>
            </div>
        </div>
    )
}

export default ErrorAuth
