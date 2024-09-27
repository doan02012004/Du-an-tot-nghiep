import Conversation from "./component/Conversation"
import InputSendMessgae from "./component/InputSendMessgae"
import ListMember from "./component/ListMember"

const ChatWidget = () => {
    return (
        <div className="h-full flex">
            {/* Friends List */}
            <ListMember />

            {/* Chat Box */}
            <div className="w-3/4 flex flex-col">
                <div className="flex-grow p-4 bg-gray-50 ">
                    <h2 className="text-xl font-semibold mb-2">
                        Chat with  {/*  {selectedFriend.name} */}
                    </h2>
                    <div className="bg-white p-3 rounded-md shadow-md h-full">
                        {/* Chat messages go here */}
                        <div className="h-full flex flex-col">
                            {/* hôp thoại chat */}
                            <Conversation />
                            {/* Input Box */}
                            <InputSendMessgae />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWidget