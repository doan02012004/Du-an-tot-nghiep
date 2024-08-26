import { Button, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Iproduct } from '../../../../common/interfaces/product'
import Product_description from './Product_description'
import { AppContext } from '../../../../common/contexts/AppContextProvider'

type Props = {
    product:Iproduct
}

const Product_information = ({product}: Props) => {
    const {choiceColor,setChoiceColor} = useContext(AppContext)
    // const [choiceColor, setChoiceColor] = useState('')
    const [choiceSize, setChoiceSize] = useState('')
    const [curentAttribute, setCurentAttribute] = useState(null)
    useEffect(() => {
        if (product && product.colors && choiceColor === "") {
            setChoiceColor(product.colors[0]?.name || ""); // Đảm bảo giá trị không gây lỗi
        }
    }, [product, choiceColor]);
    
    useEffect(() => {
        if (product && choiceColor !== "" && choiceSize !== "") {
            const findAtb = product.attributes.find((item) => 
                item.color === choiceColor && item.size === choiceSize
            );
            setCurentAttribute(findAtb);
        }
    }, [product, choiceColor, choiceSize]);
    
    console.log(curentAttribute);
    
    const onBlurQuantity = (value:any) =>{
        const input:any = document.querySelector('.quantity-input')
        if(value === ''){
            message.error("Không được để trống")
            input.value = 1
        }
        else{
            if (choiceSize==="") {
                message.error("Vui lòng chọn size")
                input.value = 1
            }else{
                if (curentAttribute!==null) {
                    if (input.value < 1) {
                        message.error("số lượng không thể nhỏ hơn 1")
                        input.value = 1
                    }else if (input.value >curentAttribute.instock) {
                        message.error(`Số lượng tối đa là ${curentAttribute.instock}`)
                        input.value = curentAttribute.instock
                    }
                }
            }
        }
        // else if(value == 0){
        //     message.error("Không được để số lượng bằng 0")
        //     input.value = 1
        // }
        // else if(value < 0){
        //     message.error("Không được để số lượng âm")
        //     input.value = 1
        // }
        // else if (value > curentAttribute.instock) {
        //     message.error(`Số lượng tối đa là ${curentAttribute.instock}`)
        // }
    }
    const giamSl = ()=>{
        const input = document.querySelector('.quantity-input')
        if (choiceSize==="") {
            message.error("Vui lòng chọn size")
        }else{
            if (curentAttribute!==null) {
                if (input.value <= 1) {
                    message.error("số lượng không thể nhỏ hơn 1")
                    input.value = 1
                }else{
                    input.value = parseInt(input.value) - 1
                }
            }
        }

    }
    const tangSl = ()=>{
        const input = document.querySelector('.quantity-input')
        if (choiceSize==="") {
            message.error("Vui lòng chọn size")
        }else{
            if (curentAttribute!==null) {
                if (input.value >curentAttribute.instock) {
                    // message.error(`Số lượng tối đa là ${curentAttribute.instock}`)
                    // input.value = curentAttribute.instock
                }
                else{
                    if (input.value < curentAttribute.instock) {
                        input.value = parseInt(input.value) + 1
                    }else{
                        message.error(`Số lượng tối đa là ${curentAttribute.instock}`)
                    }
                }
            }
        }
    }
    
  return (
    <>
        {product && (
            <div className="lg:pl-[112px]">
            <div className="lg:mb-[20px] mt-[10px] lg:mt-0">
                <h1 className="lg:text-[32px] text-[18px] font-semibold text-[#221f20]">{product.name}</h1>
            </div>
        {/*  */}
            <div className="lg:flex lg:text-[18px] lg:mb-[28px] text-[14px] mt-4 lg:mt-0 ">
                <p>SKU: <span>57E3930</span></p>
                <div className="lg:ml-[34px] mr-[17px] inline-block">
                <i className="fa-solid fa-star text-[#EEB256]" />
                <i className="fa-solid fa-star text-[#EEB256]" />
                <i className="fa-solid fa-star text-[#EEB256]" />
                <i className="fa-solid fa-star text-[#EEB256]" />
                <i className="fa-solid fa-star text-[#EEB256]" />
                </div>
                <p className='inline-block'>(0 đánh giá)</p>
            </div>
        {/*  */}
            <div className="flex lg:mb-[24px] mt-4 lg:mt-0 mb-4">
                <b className="lg:text-[27px] text-[18px] font-semibold">{(product.price_new).toLocaleString('vi-VN')}đ</b>
                <del className="lg:mt-2 mt-[6px] lg:text-[18px] text-[12px] ml-[9px] text-[#a8a9ad]">{(product.price_old).toLocaleString('vi-VN')}đ</del>
                <div className="product-detail__price-sale ml-[11px]  font-semibold text-[15px] text-white border bg-[#dc633a] h-[23px] px-2 mt-[-12px] lg:mt-0 pt-[2px]">
                -{product.discount}<span>%</span>
                </div>
            </div>
        {/*  */}
            <div className="">
                <div className="text-[16px]">
                <h3 className="lg:text-2xl font-semibold">Màu sắc: <span id="selected-color">{choiceColor===''?product.colors[0].name : choiceColor}</span></h3> 
                <div className="color-options flex lg:mt-4 lg:text-[16px] mt-2">
                    {product.colors.map((color,index)=>(
                        <div onClick={()=>{setChoiceColor(color.name);setChoiceSize('');setCurentAttribute(null)}} key={index} className="color-option lg:w-6 lg:h-6 w-5 h-5 bg-black border rounded-full mr-4 relative" style={{background: color.background}}>
                        {choiceColor === '' ? (<span className="check-icon  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" style={{ color: choiceColor === 'TRẮNG' ? 'black' : 'white' }}><i className="fas fa-check" /></span>):(<span className="check-icon  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" style={{ color: choiceColor === 'TRẮNG' ? 'black' : 'white' }}><i className="fas fa-check" /></span>)}
                        </div>
                    ))}
                    {/* <div className="color-option lg:w-6 lg:h-6 w-5 h-5 bg-white border rounded-full mr-4 relative" data-color="Trắng">
                    <span className="check-icon hidden absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-black"><i className="fas fa-check" /></span>
                    </div> */}
                </div>
                </div>   
                {/*  */}
                <div className="product-detail__size">
                <div className="size-options flex mt-[24px] mb-[12px]">
                {product.attributes.map((color, index) => {
                    if (color.color === choiceColor) {
                        return (
                            // <Button 
                            //     key={index} 
                            //     onClick={() => { setChoiceSize(color.size); }} 
                            //     className="size-option lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border flex colors-center justify-center lg:mr-[14px] mr-3" 
                            //     style={{ border: `1px solid ${choiceSize === color.size ? 'blue' : ''}` }} 
                            //     disabled={color.instock === 0}
                            // >
                            //     {color.size}
                            // </Button>
                            <div 
                                key={index + 1} 
                                onClick={() => { 
                                    if (color.instock === 0) {
                                        message.error(`Sản phẩm này đã hết size: ${color.size} vui lòng chọn size khác`);
                                    } else {
                                        setChoiceSize(color.size);
                                    }
                                }} 
                                className={` ${color?._id === curentAttribute?._id && 'border-black'} size-option cursor-pointer lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border overflow-hidden flex items-center justify-center lg:mr-[14px] mr-3 relative`}
                            >
                                {color?.size}
                                {color.instock === 0 && (
                                    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                                        <div className='block rotate-[62deg] w-px h-10 lg:h-11 bg-slate-600'></div>
                                    </div>
                                )}
                            </div>

                        );
                    }
                    return null;
                })}
                    {/* <div className="size-option lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border flex items-center justify-center lg:mr-[14px] mr-3">M</div>
                    <div className="size-option lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border flex items-center justify-center lg:mr-[14px] mr-3">L</div>
                    <div className="size-option lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border flex items-center justify-center lg:mr-[14px] mr-3">XL</div>
                    <div className="size-option lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border flex items-center justify-center lg:mr-[14px] mr-3">XXL</div> */}
                </div>
                <div className="mb-6">
                    <i className="fa-solid fa-ruler" /><span className="ml-[10px] lg:text-[14px] text-[12px] text-[#373737]">Kiểm tra size của bạn</span>
                </div>
                </div>
                {/*  */}
                <div className="product-detail__quantity flex items-center">
                <h3 className="lg:text-[19px] text-[19px] font-semibold mr-4">Số lượng:</h3>
                <div className="quantity-control flex border lg:rounded-tl-2xl lg:rounded-br-2xl rounded-tl-md rounded-br-md mt-[-12px] lg:mt-0  ">
                    <button onClick={()=>giamSl()} className="quantity-decrease lg:w-[55px] lg:h-[54px] w-8 h-8 border flex items-center justify-center mr-[5px] lg:rounded-tl-2xl lg:rounded-br-2xl rounded-tl-md rounded-br-md">-</button>
                    <input onBlur={(e)=> onBlurQuantity(e.target.value)} type="number" className="quantity-input lg:w-[60px] lg:h-[54px] w-8 h-8  text-center" defaultValue={1} min={1} />
                    <button onClick={()=>tangSl()} className="quantity-increase lg:w-[55px] lg:h-[54px] w-8 h-8 border flex items-center justify-center ml-[5px] lg:rounded-tl-2xl lg:rounded-br-2xl rounded-tl-md rounded-br-md">+</button>
                </div>
                </div>
                {/*  */}
                <div className="product-detail__actions flex lg:mt-[24px] mb-4 mt-4">
                <button onClick={()=>curentAttribute !==null ? message.success("Thêm vào giỏ hàng thành công"): message.error("Vui lòng chọn size")} className="add-to-cart hover:text-black hover:bg-white border-black border  w-[160px] h-[48px] bg-[#221f20] text-white lg:text-[16px] text-[13px] px-4 font-semibold lg:mr-[10px] mr-1
                rounded-tl-2xl rounded-br-2xl">THÊM VÀO GIỎ</button>
                <button className="buy-now hover:text-white hover:bg-black w-[125px] lg:text-[16px] text-[13px] rounded-tl-2xl rounded-br-2xl border border-black h-[48px] text-black font-semibold mx-4">MUA HÀNG</button>
                <button className="h-[48px] w-[48px] hover:text-white hover:bg-black border border-black rounded-tl-2xl rounded-br-2xl"><i className="fa-regular fa-heart" /></button>
                </div>
                {/*  */}
                <div>
                <a href="#" className="text-lg text-black border-b border-black hover:no-underline text-[14px]">Tìm tại cửa hàng</a>
                </div>
                <div className="product-detail-divider mt-[57px] mb-[45px]">
                <hr />
                </div>
                {/*  */}
                <Product_description />
                {/*  */}
            </div>
        </div>
        )}
    </>
  )
}

export default Product_information