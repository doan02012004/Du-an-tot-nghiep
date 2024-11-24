import { Slider } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IColor } from '../../../../common/interfaces/Color';
import { formatPrice } from '../../../../common/utils/product';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useFilterParams } from '../../../../common/hooks/products/useFilter';

const colorsDefault = [
  {
    name: "Đen",
    background: "black"
  },
  {
    name: "Trắng",
    background: "white"
  },
  {
    name: "Vàng",
    background: "yellow"
  },
  {
    name: "Đỏ",
    background: "red"
  },
  {
    name: "Xanh",
    background: "blue"
  },
]

const Sidebar_prod = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const [colors, setColors] = useState([]);
  const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);
  const [colorOptionsVisible, setColorOptionsVisible] = useState(false);
  const [priceOptionsVisible, setPriceOptionsVisible] = useState(false);
  const [highlightedSize, setHighlightedSize] = useState<string[]>([]);
  const [highlightedColors, setHighlightedColors] = useState<string[]>([]);
  const [price, setPrice] = useState([0, 10000000]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { setFilterParams, getFiltersFromUrl } = useFilterParams();
  const location = useLocation();

  const categorySlug = searchParams.get("category")
  const toggleSizeOptions = () => setSizeOptionsVisible(!sizeOptionsVisible);
  const toggleColorOptions = () => setColorOptionsVisible(!colorOptionsVisible);
  const togglePriceOptions = () => setPriceOptionsVisible(!priceOptionsVisible);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleSizeClick = (size: string) => {
    if(!highlightedSize.includes(size)){
      setHighlightedSize([...highlightedSize,size])
    }else{
      const newSize = highlightedSize.filter((sizeItem:string) => sizeItem !== size) 
      setHighlightedSize(newSize)
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:5000/api/colors');
      setColors(data);
      if (location.search !== "") {
        const dataUrl: any = getFiltersFromUrl();
        const colorArray = dataUrl.color ? dataUrl.color.split(',') : [];
        const resultColor: any = colorsDefault.filter(c => colorArray.includes(c.name))
        setHighlightedSize(dataUrl.size? dataUrl?.size?.split(','):[]);
        setHighlightedColors(resultColor.map(c => c.name));
        setPrice([Number(dataUrl.minPrice), Number(dataUrl.maxPrice)]);
        setSizeOptionsVisible(!sizeOptionsVisible);
        setColorOptionsVisible(!colorOptionsVisible);
        setPriceOptionsVisible(!priceOptionsVisible);
      }
    })()
  }, [location.search])



  const handleColorClick = (color:string) => {
    if(highlightedColors.includes(color)){
      setHighlightedColors(highlightedColors.filter((item:string) => item !== color))
      }else{
        setHighlightedColors([...highlightedColors, color])
      }
  };

  const handleReset = () => {
    setHighlightedSize([]);
    setHighlightedColors([]);
    setPrice([0, 10000000]);
    navigate("/product")
  };

  const handleApply = () => {
    console.log(highlightedColors)
    const params = setFilterParams({
      category: categorySlug,
      size: highlightedSize,
      color: highlightedColors,
      minPrice: price[0],
      maxPrice: price[1]
    })
    navigate(`?${params?.toString()}`);
    
    
  };
  return (
    <>
      <div className="sidebar-prod flex-shrink-0 sidebar-prod-pc hidden lg:block lg:w-[230px] lg:mr-[33px] lg:pl-[15px]">
        <div className="filter-by-side">
          <ul>
            <li className="flex justify-between">
              <p className="text-[#221F20]">Size</p>
              <p onClick={toggleSizeOptions}><i className={`fa-solid ${sizeOptionsVisible ? 'fa-minus' : 'fa-plus'} cursor-pointer`} /></p>
            </li>
            {sizeOptionsVisible && (
              <li id="sizeOptions" className="mt-4">
                <ul className="flex flex-wrap gap-3">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <li key={size}>
                      <button
                        className={`size-btn text-[12px] px-4 py-2 border rounded ${highlightedSize.includes(size) ? 'highlighted' : ''}`}
                        onClick={() => handleSizeClick(size)}
                        style={{ borderRadius: '10px 0px' }}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            <hr className="mt-[21px] mb-[15px] text-[#F7F8F9]" />
            <li className="flex justify-between mt-4">
              <p className="text-[#221F20]">Màu sắc</p>
              <p onClick={toggleColorOptions}><i className={`fa-solid ${colorOptionsVisible ? 'fa-minus' : 'fa-plus'} cursor-pointer`} /></p>
            </li>
            {colorOptionsVisible && (
              <li id="colorOptions" className="mt-4">
                <ul className="flex flex-wrap gap-2">
                  {colorsDefault.map((color: any, index) => (
                    <li key={color.name}>
                    <button
                      className={`color-btn w-5 h-5 rounded-full relative ${color.background === 'white' ? 'border border-[#000]' : ''} ${highlightedColors.includes(color.name) ? 'highlighted' : ''}`}
                      onClick={() => handleColorClick(color.name)}
                      style={{ backgroundColor: color.background, borderColor: color.background === 'white' ? 'black' : 'transparent' }}
                    >
                      {highlightedColors.includes(color.name) && (
                        <i className={`fa-solid fa-check absolute inset-0 flex items-center justify-center ${color.background === 'white' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  </li>
                  ))}
                </ul>
              </li>
            )}
            <hr className="mt-[21px] mb-[15px] text-[#F7F8F9]" />
            <li className="flex justify-between mt-4">
              <p className="text-[#221F20]">Mức giá</p>
              <p onClick={togglePriceOptions}><i className={`fa-solid ${priceOptionsVisible ? 'fa-minus' : 'fa-plus'} cursor-pointer`} /></p>
            </li>
            {priceOptionsVisible && (
              <li id="priceOptions" className="mt-4">
                <Slider
                  range
                  min={0}
                  max={10000000}
                  value={price}
                  onChange={(value) => setPrice(value)}
                  className="price-slider"
                  trackStyle={{ backgroundColor: '#000' }} // Track color
                  handleStyle={{ borderColor: '#000', backgroundColor: '#000' }} // Handle color
                />
                <div className="flex justify-between mt-2">
                  <span id="minPrice">{formatPrice(price[0])}đ</span>
                  <span id="maxPrice">{formatPrice(price[1])}đ</span>
                </div>
              </li>
            )}
            <hr className="mt-[21px] mb-[33px] text-[#F7F8F9]" />
            <li className="flex justify-around mt-4">
              <button onClick={handleReset} className="px-2 py-2 border rounded bg-white text-black w-20" style={{ borderRadius: '17px 0px 17px 0px' }}>Bỏ Lọc</button>
              <button onClick={handleApply} className="px-4 py-2 border rounded bg-black text-white w-20" style={{ borderRadius: '17px 0px 17px 0px' }}>Lọc</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar_prod