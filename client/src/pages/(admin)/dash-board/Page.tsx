import { Button, DatePicker, Form } from "antd"
import DashboardCard01 from "./_components/DashBoardCard01"
import DashboardCard02 from "./_components/DashboardCard02"


const DashBoardPage = () => {
  return (
    <>
       {/* Dashboard actions */}
       <div className="sm:flex sm:justify-between sm:items-center mb-8">

{/* Left: Title */}
<div className="mb-4 sm:mb-0">
  <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
</div>

{/* Right: Actions */}
<Form className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
    <Form.Item
    label="Từ"
    name={'startDate'}
    >
        <DatePicker />
    </Form.Item>
    <Form.Item
    label="Đến"
    name={'finishDate'}
    >
        <DatePicker />
    </Form.Item>
  <Button htmlType="submit"  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Add View</Button>

</Form>

</div>
    <div className="grid grid-cols-12 gap-6" >
        <DashboardCard01 />
        <DashboardCard01 />
        <DashboardCard01 />
        <DashboardCard02 />
    </div>
    
    </>
  )
}

export default DashBoardPage