/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IColor } from '../../../common/interfaces/Color'
import { Iattribute, Igallery, Iproduct } from '../../../common/interfaces/product'
import { formatPrice } from '../../../common/utils/product'


type Props = {
  product: Iproduct,
  colorsUrl?: string,
  maxPrice?:number|string,
  minPrice?:number|string,
  discount?:number
}

const Product = ({ product,maxPrice,minPrice,discount,colorsUrl }: Props) => {
  // const [isOpenSize, setIsOpenSize] = useState(false)
  const [gallery, setGallery] = useState<Igallery>({avatar:'',items:[],name:'',background:''})
  const [variant,setVariant] = useState<Iattribute | undefined | null>(null)

  
  const resultVariant = (option:{attributes:Iattribute[],colorUrl?:string,minPrice?:number,maxPrice?:number,discount?:number}) =>{
    const min_price = option.minPrice ?? 0;
    const max_price = option.maxPrice ?? 10000000;
    const arrColor =  option.colorUrl?.toUpperCase().split(',')?? []
    if(!option.colorUrl && !option.discount  && !option.minPrice && !option.maxPrice){
      const newVariant = option.attributes?.reduce((current, item) =>item.price_new < current.price_new ? item: current, product?.attributes[0] )
      return newVariant
    }else if(option?.colorUrl && arrColor.length>0){
      const newVariant = option.attributes?.find((item) => (arrColor?.includes(item.color) && item.price_new >= min_price && item.price_new <= max_price ) )
      return newVariant
    }else if(option.discount){
      const newVariant = option.attributes?.reduce((current, item) =>item.discount > current.discount ? item: current, product?.attributes[0] )
      return newVariant
    }else{
      const newVariant = option.attributes?.find((item) => (item.price_new >= min_price && item.price_new <= max_price ) )
      return newVariant
    }
  }

  useEffect(() => {
    const newVariant = resultVariant({attributes:product?.attributes,colorUrl:colorsUrl,minPrice:Number(minPrice),maxPrice:Number(maxPrice),discount})
    const newGallery = product?.gallerys?.find((item:Igallery) => newVariant?.color == item.name) as Igallery
    setGallery(newGallery)
    setVariant(newVariant)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, maxPrice, minPrice, discount, colorsUrl])
  

  const onPickColor = (item: IColor) => {
    const newGallery: Igallery | any = product?.gallerys.find((gallery: Igallery) => gallery.name == item.name)
    setGallery(newGallery)
  }

  return (
    <>
      <div>
        <div className="h-[236px] lg:h-[350px] w-full relative overflow-hidden mb-4">
          <Link to={`/productdetails/${product.slug}`} className="block w-full h-full">
            <img src={gallery?.avatar} className="w-full h-full object-cover" />
          </Link>
          <span className="absolute top-0 left-0 text-[12px]/[150%] font-semibold py-1 px-3 bg-rose-900 text-white rounded-br-full">
            Fendi shop
          </span>
          {
            variant?.discount !== 0 && (
              <span className="absolute size-6 lg:size-10 rounded-full top-2 right-2 text-[12px]/[150%] font-semibold bg-black text-white flex justify-center items-center">
                {variant?.discount}%
              </span>
            )
          }
        </div>
        <div className="flex justify-between mb-2 lg:mb-3">
          <ul className="flex items-center gap-x-[10px]">
            {
              product?.colors?.map((item: IColor, index: number) => (
                <li key={index} onClick={() => onPickColor(item)} className={`cursor-pointer border size-4 ${item.name == 'TRẮNG' ? 'text-black' : 'text-white'} lg:size-[18px] rounded-full font-thin text-sm flex items-center justify-center`} style={{ background: item.background }}>
                  {item.name == gallery?.name && (<i className="fa-solid fa-check" />)}
                </li>
              ))
            }
          </ul>
          <span className=" cursor-pointer text-sm font-thin text-black ">
            <i className="fa-regular fa-heart" />
          </span>
        </div>
        <a href="#" className="block text-[12px]/[16px] lg:text-sm hover:text-rose-800 mb-2 lg:mb-[10px]">{product?.name}</a>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className=" text-sm font-semibold text-dark lg:text-base">{variant? formatPrice(variant?.price_new): 0}đ</span>
            <span className=" text-[10px]/[150%] line-through lg:text-[12px]/[150%]">{variant? formatPrice(variant?.price_old): 0}đ</span>
          </div>
          {/* <div className="relative btn-cart">
            <button onClick={() => onSetProductId(product)} className="card-add-to-cart size-5 text-[12px] border-dark border bg-dark rounded-tl-lg rounded-br-lg text-white transition duration-500 ease-in-out hover:bg-white lg:text-base hover:text-black lg:size-8">
              <i className="fa-solid fa-cart-arrow-down" />
            </button>
            {product?._id == productId && isOpenSize == true && (
              <ul className="card-list-size w-[100px] absolute bottom-[35px]  transition-all duration-300 ease-in-out right-0 bg-white lg:w-[132px] border border-gray-200 z-10">
                {
                  product?.sizes.map((item: string) => (
                    <li key={item}>
                      <button onClick={() => onAddToCart(item)} disabled={!checkSizes.includes(item)} className={`${!checkSizes.includes(item) ? 'text-gray-300' : 'text-dark hover:border-dark '} w-full text-sm py-2  font-semibold border border-white lg:text-base lg:py-3 `}>{item}</button>
                    </li>
                  ))
                }
              </ul>
            )}
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Product