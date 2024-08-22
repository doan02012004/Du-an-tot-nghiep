import React, { useState, useEffect } from 'react';
import { Iproduct } from '../../../common/interfaces/product';
import { Link } from 'react-router-dom';
import { IColor } from '../../../common/interfaces/Color';
import { formatPrice } from '../../../common/utils/product';
import { useDispatch, useSelector } from 'react-redux';
import { setProductId } from '../../../common/redux/features/productSlice';

type Props = {
  product: Iproduct;
};

const Product = ({ product }: Props) => {
  const productId = useSelector((state: any) => state.product.productId)
  const dispath = useDispatch()
  const [isOpenSize, setIsOpenSize] = useState(false)
  const [selectedColor, setSelectedColor] = useState<IColor | null>(product.colors[0]);

  const handleColorClick = (color: IColor) => {
    setSelectedColor(color);
  };

  const onSetProductId = async (product: Iproduct) => {
    if (productId !== product?._id) {
      dispath(setProductId(product._id))
      setIsOpenSize(true)
    }
    if (productId == product?._id && isOpenSize == false) {
      await dispath(setProductId(null))
      dispath(setProductId(product._id))
      setIsOpenSize(true)
    }
    if (productId == product?._id && isOpenSize == true) {
      dispath(setProductId(null))
    }
  }

  const attributesFilter = product.attributes.filter(attribute => attribute.color === selectedColor?.name);

  return (
    <div className="swiper-slide swiper-slide-active w-full" role="group" aria-label="1 / 9">
      <div>
        <div className="h-[236px] lg:h-[350px] w-full relative overflow-hidden mb-4">
          <Link to="#" className="block w-full h-full">
            {product.gallerys.map((item, index) => (
              item.name === selectedColor?.name && (
                <img
                  key={index}
                  src={item.avatar}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              )
            ))}
          </Link>

          <span className="absolute top-0 left-0 text-[12px]/[150%] font-semibold py-1 px-3 bg-rose-900 text-white rounded-br-full">
            Best seller
          </span>
          <span className="absolute size-6 lg:size-10 rounded-full top-2 right-2 text-[12px]/[150%] font-semibold bg-black text-white flex justify-center items-center">
            {product.discount}%
          </span>
        </div>
        <div className="flex justify-between mb-2 lg:mb-3">
          <ul className="flex items-center gap-x-[10px]">
            {product.colors.map((color, index) => (
              <li key={index}>
                <button
                  className={`color-btn w-5 h-5 rounded-full relative ${selectedColor?._id === color._id ? 'highlighted' : ''}`}
                  onClick={() => handleColorClick(color)}
                  style={{
                    backgroundColor: color.background,
                    borderColor: color.background === 'white' ? 'black' : 'transparent',
                  }}
                >
                  {selectedColor?._id === color._id && (
                    <i
                      className={`fa-solid fa-check absolute inset-0 flex items-center justify-center ${color.background === 'white' ? 'text-black' : 'text-white'
                        }`}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <span className=" cursor-pointer text-sm font-thin text-black ">
            <i className="fa-regular fa-heart" />
          </span>
        </div>
        <a href="#" className="block text-[12px]/[16px] lg:text-sm hover:text-rose-800 mb-2 lg:mb-[10px]">
          {product.name}
        </a>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className=" text-sm font-semibold text-dark lg:text-base">{formatPrice(product.price_new)}đ</span>
            <span className=" text-[10px]/[150%] line-through lg:text-[12px]/[150%]">{formatPrice(product.price_old)}đ</span>
          </div>
          <div className="relative btn-cart">
            <button onClick={() => onSetProductId(product)} className="card-add-to-cart size-5 text-[12px] border-dark border bg-dark rounded-tl-lg rounded-br-lg text-white transition duration-500 ease-in-out hover:bg-white lg:text-base hover:text-black lg:size-8">
              <i className="fa-solid fa-cart-arrow-down" />
            </button>
            {product._id == productId && isOpenSize == true && (
              <ul
                className={`w-[100px] absolute bottom-[35px] right-0 bg-white lg:w-[132px] border border-gray-200 z-10
                ${isOpenSize ? `card-list-size-open` : `card-list-size-close`}
              `}
              >
                {attributesFilter.map((attribute, index) => (
                  <li key={index}>
                    <button disabled={attribute.instock === 0 || attribute.instock < 0} className={`w-full text-sm py-2 text-dark font-semibold border border-white lg:text-base lg:py-3 hover:bg-gray-200 ${attribute.instock === 0 || attribute.instock < 0 ? " pointer-events-none opacity-35" : ""} `}>
                      {attribute.size}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
