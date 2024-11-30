/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import AddSizes from './AddSizes'
import { Iattribute, Igallery, InewColor, Iproduct } from '../../../../../common/interfaces/product'
import AddColors from './AddColors'
import { Button, Select, Space, Tabs, TabsProps } from 'antd'
import useColorQuery from '../../../../../common/hooks/color/useColorQuery'
import { IColor } from '../../../../../common/interfaces/Color'
import { useDispatch, useSelector } from 'react-redux'
import { setAttributes, setGallerys } from '../../../../../common/redux/features/productSlice'
import AttributeItem from '../../_components/AttributeItem'
import ColorItem from '../../_components/ColorItem'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import useAttributeMutation from '../../../../../common/hooks/products/useAttributeMutation'
type AddProperties = {
  product: Iproduct
}
const AddProperties = ({ product }: AddProperties) => {
  const [option, setOption] = useState<'size' | 'color' | null>(null)
  const [optionSize, setOptionSize] = useState<'size' | 'freesize' | null>(null)
  const [checkGallerys, setCheckGallerys] = useState(false)
  const [checkAttributes, setCheckAttributes] = useState(false)
  const [colorsProduct,] = useState<string[]>(product?.colors.map((item: IColor) => item.name))
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<any>([])
  const [galleryItemsAnt, setGalleryItemsAnt] = useState<any>([])
  const gallerys = useSelector((state: any) => state.product.gallerys)
  const attributes = useSelector((state: any) => state.product.attributes)
  const colorQuery = useColorQuery()
  const attributeMutation = useAttributeMutation()
  const dispath = useDispatch()
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span className={`${checkAttributes && 'text-green-500 '}`}>Các biến thể {checkAttributes && (<CheckOutlined className='ml-2' />)}</span>
      ),
      children: (
        <>
          {
            attributes?.length > 0 && (
              <div className='mb-4 '>
                <h3 className='font-bold text-base mb-2 text-red'>Biến thể *</h3>
                <div className='grid grid-cols-4 gap-6' >
                  {attributes?.map((attribute: Iattribute, index: number) => (
                    <AttributeItem data={attribute} index={index} key={index} />
                  ))}

                </div>
              </div>
            )
          }
        </>
      ),
    },
    ...galleryItemsAnt,
  ]
  useEffect(() => {
    if (colors.length > 0) {
      if (gallerys.length > 0) {
        setCheckGallerys(!gallerys.some((item: Igallery) => item.check === false))
      } else {
        setCheckGallerys(false)
      }
    }
    if (attributes.length > 0) {
      setCheckAttributes(!attributes.some((item: Iattribute) => item.isCheck === false))
    } else {
      setCheckAttributes(false)
    }
  }, [gallerys, attributes, colors])
  useEffect(() => {
    if (product?.sizes?.length > 0) {
      const isSize = sizes.includes('FREESIZE')
      if (isSize) {
        setOptionSize('freesize')
      } else {
        setOptionSize('size')
      }
    } else {
      if (optionSize !== null) {
        setOptionSize(null)
      }
    }
  }, [sizes])
  useEffect(() => {
    if (gallerys.length > 0) {
      const newItemsAnt = gallerys?.map((item: Igallery, index: number) => {
        return {
          key: index + 2,
          label: (
            <span className={`${item.check && 'text-green-500 '}`}>{item.name}{item.check && (<CheckOutlined className='ml-2' />)}</span>
          ),
          children: (<ColorItem data={gallerys[index]} key={item.name} />)
        }
      })
      setGalleryItemsAnt(newItemsAnt)
    } else {
      setGalleryItemsAnt([])
    }
  }, [gallerys])
  useEffect(() => {
    const newGallerys = [] as Igallery[]
    const newAttributes = [] as Iattribute[]
    if (sizes.length > 0 && colors.length == 0) {
      product.colors.map((color: IColor) => {
        sizes.map((size: string) => {
          // tìm kiếm xem đã tồn tại attribute hay chưa
          const checkAtb = attributes.find((item: Iattribute) => (item.size == size && item.color == color.name))
          // nếu chưa thì push phần tử mới
          if (!checkAtb) {
            newAttributes.push({
              size: size,
              color: color.name,
              price_new: 0,
              price_old: 0,
              discount: 0,
              instock: 0,
              isCheck: false,
              weight: 0,
              volume: 0,
              length: 0,
              width: 0,
              height: 0
            });
          } else {
            // nếu đã tồn tại thì lấy chính phần tử cũ đó
            newAttributes.push(checkAtb)
          }
        })
      })
      dispath(setGallerys(newGallerys))
      dispath(setAttributes(newAttributes))
      return
    } else if (colors.length > 0 && sizes.length == 0) {
      colors?.map((id: string) => {
        // tìm color bằng id dựa trên Api
        const findColor: IColor = colorQuery.data.find((item: Igallery) => item._id == id)
        // check xem đã có 1 màu nào đó tồn tại trong mảng hay chưa
        const checkColor = gallerys.find((item: Igallery) => item.name == findColor.name)
        //nếu chưa có sẽ push vào
        if (!checkColor) {
          newGallerys.push({
            name: findColor.name,
            background: findColor.background,
            avatar: "",
            items: [],
            check: false
          })
        } else {
          // nếu có rồi thì lấy lại phần tử cũ
          newGallerys.push(checkColor)
        }
        product.sizes?.map((size: string) => {
          // tìm kiếm xem đã tồn tại attribute hay chưa
          const checkAtb = attributes.find((item: Iattribute) => (item.size == size && item.color == findColor.name))
          // nếu chưa thì push phần tử mới
          if (!checkAtb) {
            newAttributes.push({
              size: size,
              color: findColor.name,
              price_new: 0,
              price_old: 0,
              discount: 0,
              isCheck: false,
              instock: 0,
              weight: 0,
              volume: 0,
              length: 0,
              width: 0,
              height: 0
            });
          } else {
            // nếu đã tồn tại thì lấy chính phần tử cũ đó
            newAttributes.push(checkAtb)
          }
        })
      })
      dispath(setGallerys(newGallerys))
      dispath(setAttributes(newAttributes))
      return
    } else {
      setCheckGallerys(false)
      setCheckAttributes(false)
      dispath(setGallerys([]))
      dispath(setAttributes([]))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes, colors])
  const onAdd = () => {
    if (colors.length > 0) {
      const newColors = colorQuery?.data?.filter((item: IColor) => colors.includes(item?._id))
      const newData: InewColor = {
        colors: newColors,
        gallerys: gallerys,
        attributes: attributes
      }
      attributeMutation.mutate({ action: "addColors", newColor: newData, productId: product._id })
      setSizes([])
      setColors([])
      dispath(setGallerys([]))
      dispath(setAttributes([]))
      return
    }
    if (sizes.length > 0) {
      const newData = {
        sizes: sizes,
        attributes: attributes
      }
      attributeMutation.mutate({ action: 'addSizes', productId: product._id, newSize: newData })
      setSizes([])
      setColors([])
      dispath(setGallerys([]))
      dispath(setAttributes([]))
      return
    }
  }
  return (
    <div className='mb-4'>
      {option == 'size' && (<AddSizes product={product} setOption={setOption} />)}
      {option == 'color' && (<AddColors setOption={setOption} product={product} />)}
      <p className='text-red text-xs'>Lưu ý*: chỉ thêm được lần lượt size hoặc màu sắc</p>
      <Space>
        <Select
          mode="multiple"
          value={sizes}
          disabled={colors.length > 0 ? true : false}
          className='w-80'
          onChange={(value) => setSizes(value)}
          placeholder="Vui lòng chọn size"
          options={
            [
              { value: 'S', label: 'S', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('S') ? true : false) },
              { value: 'M', label: 'M', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('M') ? true : false) },
              { value: 'L', label: 'L', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('L') ? true : false) },
              { value: 'XL', label: 'XL', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('XL') ? true : false) },
              { value: 'XXL', label: 'XXL', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('XXL') ? true : false) },
              { value: '3XL', label: '3XL', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('3XL') ? true : false) },
              { value: '4XL', label: '4XL', disabled: optionSize == 'freesize' ? true : (product?.sizes.includes('4XL') ? true : false) },
              { value: 'FREESIZE', label: 'FREESIZE', disabled: optionSize == 'size' ? true : false }
            ]
          }
        />
        <Select
          loading={colorQuery.isLoading}
          mode="multiple"
          value={colors}
          disabled={sizes.length > 0 ? true : false}
          className='w-80'
          onChange={(value) => setColors(value)}
          placeholder="Vui lòng chọn màu sắc"
          options={colorQuery?.data?.map((item: IColor) => ({ label: item.name, value: item._id, disabled: colorsProduct?.includes(item.name) ? true : false }))}
        />
        {
          (colors.length > 0) && (
            <Button
              icon={<PlusOutlined />}
              type='primary'
              className='bg-indigo font-semibold'
              disabled={!checkAttributes || !checkGallerys}
              onClick={onAdd}
            >
              Thêm màu
            </Button>
          )
        }
        {
          sizes.length > 0 && (
            <Button
              icon={<PlusOutlined />}
              type='primary'
              className='bg-indigo font-semibold'
              disabled={!checkAttributes}
              onClick={onAdd}
            >
              Thêm size
            </Button>
          )
        }
      </Space>
      {attributes.length > 0 && (
        <Tabs items={items} />
      )}

    </div>
  )
}

export default AddProperties