import { BackwardOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormItem from 'antd/es/form/FormItem'
import useBrandMutation from '../../../../common/hooks/brands/useBrandMutation'
import useBrandQuery from '../../../../common/hooks/brands/useBrandQuery'
import { IBrands } from '../../../../common/interfaces/brands'

const BrandsForm = () => {
    const {id} = useParams();
    const [form] = Form.useForm()
    const mutation = useBrandMutation()

    const {data} = useBrandQuery(id);
    
    useEffect(() => {

        if(!id) return

        form.setFieldsValue(data)

    }, [data, form , id])

    const onSubmit = (brand: IBrands)=>{

        if (id) {
            mutation.mutate({action : "update", brand  : {_id : id, ...brand}})
            return
        }
        mutation.mutate({action : "add", brand})
    }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className='font-semibold text-[20px]'> {id ? "CẬP NHẬT THƯƠNG HIỆU" : "THÊM MỚI THƯƠNG HIỆU"}</h1>
        <Link to={`/admin/brands`}><Button type='primary'><BackwardOutlined />Quay lại</Button></Link>
      </div>
        <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{ status: 'Hoạt động' }}>
      <Form.Item name="name" label="Name" rules={[{ required: true,message:"Không được bỏ trống" }]}>
        <Input />
      </Form.Item>
      <FormItem label="Trạng thái" name="status" hidden>
        <Input />
      </FormItem>
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

export default BrandsForm