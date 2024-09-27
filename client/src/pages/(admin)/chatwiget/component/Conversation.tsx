
const Conversation = () => {
    return (
        <div className="flex-grow ">
            <h2 className="text-xl font-semibold mb-2 border-b-2 ">
                Chat with  {/*  {selectedFriend.name} */}
            </h2>
            <div className="bg-blue-100 p-2 rounded-md mb-2 self-start">
                Hello, how are you?
            </div>
            <div className="bg-gray-200 p-2 rounded-md mb-2 self-end">
                I'm good, thanks! You?
            </div>
        </div>
    )
}

export default Conversation