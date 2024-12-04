import { CloseOutlined } from '@ant-design/icons'
import iconChat from '../../../../assets/logos/logoAdmin.png'
import { useDispatch } from 'react-redux'
import { setOpenChat } from '../../../../common/redux/features/chatSlice'

const ProfileMemberChat = () => {
    const dispath = useDispatch()
    return (
        <div className="flex items-center justify-between p-3 border-b bg-gray-700 rounded-t-lg border-gray-300">
            <div className='flex items-center'>
                <img
                    src={iconChat}
                    alt="Admin Fendi Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-bold text-md text-white">Fendi Shop</span>
            </div>
            <CloseOutlined onClick={()=>dispath(setOpenChat(false))} className=' cursor-pointer text-white text-xl hover:text-red' />
        </div>
    )
}

export default ProfileMemberChat