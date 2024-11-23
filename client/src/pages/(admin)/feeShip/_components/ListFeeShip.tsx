import { CarOutlined, EnvironmentOutlined, TagOutlined } from "@ant-design/icons"
import { Button } from "antd"

const ListFeeShip = () => {
    return (

        <div>
            <h2 className="text-2xl text-">Quản lý phí ship</h2>
            <div className="flex justify-center items-center gap-7 p-2 border rounded-lg bg-slate-100 mb-3">
                <div className="w-[30%] text-center">
                    <Button style={{ width: "100%" }} icon={<TagOutlined />} >
                        Chuyển phát thường
                    </Button>
                </div>
                <div className="w-[30%] text-center">
                    <Button style={{ width: "100%" }} icon={<CarOutlined />} >
                        Chuyển phát nhanh
                    </Button>
                </div>
                <div className="w-[30%] text-center">
                    <Button style={{ width: "100%" }} icon={<EnvironmentOutlined />} >
                        Chuyển phát nội thành
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ListFeeShip
