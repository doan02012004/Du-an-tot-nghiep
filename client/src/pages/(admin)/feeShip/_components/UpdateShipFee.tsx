import { Button } from "antd"

const UpdateShipFee = () => {
    return (
        <div className="flex justify-center items-center gap-10">
            <table className=" w-1/2 border-collapse border border-gray-300">
                <thead>
                    <th colSpan={4} className="text-center bg-blue-500 text-dark py-2">
                        Giá của trọng lượng
                    </th>
                    <tr>
                        <th className="border border-gray-300 p-2">Min rate</th>
                        <th className="border border-gray-300 p-2">Max rate</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="pb-8">
                        <td className="border border-gray-300 p-2 text-center">200 gram</td>
                        <td className="border border-gray-300 p-2 text-center">1000 gram</td>
                        <td className="border border-gray-300 p-2 text-center">20000đ</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <Button type="primary" className="mr-2">Sửa</Button>
                            <Button type="primary" danger>Xóa</Button>
                        </td>
                    </tr>
                    <tr className="mb-3">
                        <td className="border border-gray-300 p-2 text-center">200 gram</td>
                        <td className="border border-gray-300 p-2 text-center">1000 gram</td>
                        <td className="border border-gray-300 p-2 text-center">20000đ</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <Button type="primary" className="mr-2">Sửa</Button>
                            <Button type="primary" danger>Xóa</Button>
                        </td>
                    </tr>
                    <tr className="mb-3">
                        <td className="border border-gray-300 p-2 text-center">200 gram</td>
                        <td className="border border-gray-300 p-2 text-center">1000 gram</td>
                        <td className="border border-gray-300 p-2 text-center">20000đ</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <Button type="primary" className="mr-2">Sửa</Button>
                            <Button type="primary" danger>Xóa</Button>
                        </td>
                    </tr>

                </tbody>
            </table>
            <table className="w-1/2 border-collapse border border-gray-300">
                <thead>
                    <th colSpan={4} className="text-center bg-blue-500 text-dark py-2">
                        Giá của thể tích
                    </th>
                    <tr>
                        <th className="border border-gray-300 p-2">Min rate</th>
                        <th className="border border-gray-300 p-2">Max rate</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 p-2 text-center">1</td>
                        <td className="border border-gray-300 p-2 text-center">Quận 1</td>
                        <td className="border border-gray-300 p-2 text-center">10000</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <Button type="primary" className="mr-2">Sửa</Button>
                            <Button type="primary" danger>Xóa</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UpdateShipFee
