import { Button, Form, Input, Space } from 'antd'
import useCategoryMutation from '../../../../common/hooks/categories/useCategoryMutation'
import { Icategories } from '../../../../interface/categories'
import { Link } from 'react-router-dom'
import { BackwardOutlined } from '@ant-design/icons'

type Props = {}

const CategoryAdd = (props: Props) => {
    const [form] = Form.useForm()
    const mutation = useCategoryMutation()
    const onSubmit = (category:Icategories)=>{
        mutation.mutate(category)
    }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className='font-semibold text-[20px]'>THÊM MỚI DANH MỤC</h1>
        <Link to={`/admin/categories`}><Button type='primary'><BackwardOutlined />Quay lại</Button></Link>
      </div>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true,message:"Không được bỏ trống" }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit'>Submit</Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
    </div>
  )
}

export default CategoryAdd