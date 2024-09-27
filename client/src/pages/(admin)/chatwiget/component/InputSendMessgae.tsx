
const InputSendMessgae = () => {
    return (
        <>
            <div className="mt-4 flex ">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                    placeholder="Nhập tin nhắn..."
                />
                <button className="bg-blue text-white p-2 rounded-r-md hover:bg-blue-600">
                    Gửi
                </button>
            </div>

        </>
    )
}

export default InputSendMessgae