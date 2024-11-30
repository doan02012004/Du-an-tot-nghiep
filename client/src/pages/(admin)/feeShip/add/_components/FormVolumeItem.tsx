import { CloseCircleFilled, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form, InputNumber } from 'antd'
import { IVolumeRate } from '../../../../../common/interfaces/ship'
import { useEffect } from 'react'

type FormVolumeItemProps = {
    index: number,
    volume: IVolumeRate,
    volumes: IVolumeRate[],
    setVolumes: any
}
const FormVolumeItem = ({ index, volume, volumes, setVolumes }: FormVolumeItemProps) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(volume)
    }, [volume, index])

    const onEditForm = () => {
        const newVolume = { ...volume, check: false }
        const newVolumes = volumes.map((volume: IVolumeRate, i: number) => i == index ? newVolume : volume)
        setVolumes(newVolumes)
    }
    const onDeleteForm = () => {
        if (volumes.length - 1 == index) {
            const newVolumes = volumes.filter((_volume: IVolumeRate, i: number) => i !== index)
            setVolumes(newVolumes)
        } else {
            const afterVolume = { ...volumes[index + 1], minVolume: volume.minVolume }
            const filterVolumes = volumes.filter((_volume: IVolumeRate, i: number) => i !== index)
            const newVolumes = filterVolumes.map((volume: IVolumeRate, i: number) => i == index ? afterVolume : volume)
            setVolumes(newVolumes)
        }
    }
    const onSaveForm = (data: IVolumeRate) => {
        const newVolume = { ...data, check: true }
        const newVolumes = volumes.map((volume: IVolumeRate, i: number) => i == index ? newVolume : volume)
        setVolumes(newVolumes)
    }

    return (
        <div className={` relative col-span-4 p-4 rounded-lg border ${volume.check ? ' border-green-600' : ' border-gray-300'}`}>
            <CloseCircleFilled onClick={onDeleteForm} className=' text-2xl text-red cursor-pointer absolute -top-3 rounded-full -right-3' />
            {volume?.check && <button onClick={onEditForm} className='text-yellow absolute -top-3 right-8 cursor-pointer size-7 rounded-full border border-gray-500 bg-white flex items-center justify-center'> <EditOutlined /></button>}
            <Form
                layout='vertical'
                disabled={volume?.check}
                form={form}
                onFinish={onSaveForm}
            >
                <Form.Item
                    name={'minVolume'}
                    label='min Volume'
                    rules={[{ required: true }, { min: 0, type: "number" }]}
                >
                    <InputNumber className='w-full' />
                </Form.Item>
                <Form.Item
                    name={'maxVolume'}
                    label='max Volume'
                    rules={[{ required: true }, { min: 0, type: "number" }]}
                >
                    <InputNumber className='w-full' />
                </Form.Item>
                <Form.Item
                    name={'price'}
                    label='Price'
                    rules={[{ required: true }, { min: 0, type: "number" }]}
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

export default FormVolumeItem