import { CloseCircleFilled, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form, InputNumber } from 'antd'
import { IWeightRate } from '../../../../../common/interfaces/ship'
import { useEffect } from 'react'

type FormWeightItemProps ={
    index:number,
    weight:IWeightRate,
    weights:IWeightRate[],
    setWeights:any
}

const FormWeightItem = ({index,setWeights,weight,weights}:FormWeightItemProps) => {
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue(weight)
    },[weight,index])

    const onEditForm = () =>{
        const newWeight = {...weight,check:false}
        const newWeights = weights.map((weight:IWeightRate,i:number) => i==index?newWeight:weight )
        setWeights(newWeights)
    }
    const onDeleteForm = () =>{
        if(weights.length - 1  == index){
            const newWeights = weights.filter((_weight:IWeightRate,i:number) => i!==index )
            setWeights(newWeights)
        }else{
            const afterWeight = {... weights[index+1],minWeight:weight.minWeight}
            const filterWeights = weights.filter((_weight:IWeightRate,i:number) => i!==index )
            const newWeights = filterWeights.map((weight:IWeightRate,i:number) => i == index?afterWeight: weight)
            setWeights(newWeights)
        }
    }
    const onSaveForm = (data:IWeightRate) =>{
        const newWeight = {...data,check:true}
        const newWeights = weights.map((weight:IWeightRate,i:number) => i==index?newWeight:weight )
        setWeights(newWeights)
    }

  return (
    <div className={` relative col-span-4 p-4 rounded-lg border ${weight.check? ' border-green-600':' border-gray-300'}`}>
        <CloseCircleFilled onClick={onDeleteForm} className=' text-2xl text-red cursor-pointer absolute -top-3 rounded-full -right-3'/>
        {weight?.check&& <button onClick={onEditForm} className='text-yellow absolute -top-3 right-8 cursor-pointer size-7 rounded-full border border-gray-500 bg-white flex items-center justify-center'> <EditOutlined/></button>}
        <Form
        layout='vertical'
        disabled={weight?.check}
        form={form}
        onFinish={onSaveForm}
        >
            <Form.Item
            name={'minWeight'}
            label='min Weight'
            rules={[{required:true},{min:0,type:"number"}]}
            >
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
            name={'maxWeight'}
            label='max Weight'
            rules={[{required:true},{min:0,type:"number"}]}
            >
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
            name={'price'}
            label='Price'
            rules={[{required:true},{min:0,type:"number"}]}
            >
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item >
                <Button htmlType='submit' type='primary'><SaveOutlined />Save</Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default FormWeightItem