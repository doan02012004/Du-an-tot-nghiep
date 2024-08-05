/* eslint-disable @typescript-eslint/no-explicit-any */
import useLocalStorage from '../../../../../common/hooks/localstorage/useLocalStorage'
import { Iattribute, Igallery } from '../../../../../common/interfaces/product'
import { IColor } from '../../../../../common/interfaces/Color'
import { Button, Form, message, Select } from 'antd'
import useColorQuery from '../../../../../common/hooks/color/useColorQuery'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAttributes, setGallerys } from '../../../../../common/redux/features/productSlice'
import CreateProduct from './CreateProduct'

const ChoiceProperties = () => {
  const [form] = Form.useForm()
  const [, setGallerysLocal] = useLocalStorage('gallerys', [])
  const [, setAttributesLocal] = useLocalStorage('attributes', [])
  const [sizeLocal, setSizeLocal] = useLocalStorage('sizes', [])
  const [colorLocal, setColorLocal] = useLocalStorage('colors', [])
  const gallerys = useSelector((state: any) => state.product.gallerys)
  const attributes = useSelector((state: any) => state.product.attributes)
  const colorQuery = useColorQuery()
  const dispath = useDispatch()
  useEffect(() => {
    if (sizeLocal) {
      form.setFieldValue('sizes', sizeLocal)
      form.setFieldValue('colors', colorLocal)
    }
  }, [sizeLocal, colorLocal, form])
  const onCreateProperties = async (data: any) => {
    if (colorLocal.length == 0) return message.error('Vui lòng chọn màu sắc')
    if (sizeLocal.length == 0) return message.error('Vui lòng chọn màu size')
    const newGallerys = [] as Igallery[]
    const newAttributes = [] as Iattribute[]
    await data.colors.map((id: string) => {
      // tìm color bằng id dựa trên Api
      const findColor: IColor = colorQuery.data.find((item: Igallery) => item._id == id)
      // check xem đã có 1 màu nào đó tồn tại trong mảng hay chưa
      const checkColor = gallerys.find((item: Igallery) => item.colorId._id == id)
      //nếu chưa có sẽ push vào

      if (!checkColor) {
        newGallerys.push({
          colorId: findColor,
          avatar: "",
          items: [],
          check: false
        })
      } else {
        // nếu có rồi thì lấy lại phần tử cũ
        newGallerys.push(checkColor)
      }

      data.sizes.map((size: string) => {
        // tìm kiếm xem đã tồn tại attribute hay chưa
        const checkAtb = attributes.find((item: Iattribute) => (item.size == size && item.color == findColor.name))
        // nếu chưa thì push phần tử mới
        if (!checkAtb) {
          newAttributes.push({
            size: size,
            color: findColor.name,
            instock: 0
          });
        } else {
          // nếu đã tồn tại thì lấy chính phần tử cũ đó
          newAttributes.push(checkAtb)
        }
      })
    })
    await setGallerysLocal(newGallerys)
    await setAttributesLocal(newAttributes)
    dispath(setGallerys(newGallerys))
    dispath(setAttributes(newAttributes))

  }
  console.log(attributes)
  return (
    <div className='flex gap-x-4'>
      <Form form={form} className='w-max mx-auto flex items-center gap-x-3 mb-2' onFinish={onCreateProperties}>
        <Form.Item
          label="Size"
          name={'sizes'}
          className='w-80'
          rules={[{ required: true, message: "Bat buoc nhap" }]}
        >
          <Select
            mode="multiple"
            value={sizeLocal}
            className='w-80'
            onChange={setSizeLocal}
            placeholder="Vui lòng chọn size"
            options={[
              { value: 'S', label: 'S' },
              { value: 'M', label: 'M' },
              { value: 'L', label: 'L' },
              { value: 'XL', label: 'XL' },
              { value: 'XXL', label: 'XXL' },
            ]}
          />
        </Form.Item>
        <Form.Item
          className='w-80'
          label="Color"
          name={'colors'}
          rules={[{ required: true, message: "Bat buoc nhap" }]}
        >
          <Select
            loading={colorQuery.isLoading}
            mode="multiple"
            value={colorLocal}
            className='w-80'
            onChange={setColorLocal}
            placeholder="Vui lòng chọn màu sắc"
            options={colorQuery?.data?.map((item: IColor) => ({ label: item.name, value: item._id }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Tạo biến thể</Button>
        </Form.Item>
      </Form>
      <CreateProduct />
    </div>
  )
}

export default ChoiceProperties