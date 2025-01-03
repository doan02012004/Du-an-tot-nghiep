import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';


const Top_main_prod = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const applySort = (dataSellOrder: string) => {
    searchParams.set("sell_order",dataSellOrder)
    setSearchParams(searchParams)
  };

  return (
    <>
      <div className="top-main-prod lg:flex lg:justify-between lg:items-center lg:mb-4 lg:w-[920px] lg:pl-0">
        <h1 className="sub-title-main lg:text-2xl text-[20px] mb-[10px] font-semibold text-gray-800 lg:ml-[7px]">Sản phẩm</h1>
        <div className="flex justify-between w-full lg:w-[274px]">
          <div className="dropdown mr-4 lg:mr-0 lg:w-[274px] w-[82%]">
            <button onClick={toggleDropdown} className="dropbtn flex items-center justify-between px-5 py-2 lg:px-5 lg:py-3 lg:text-[15px] text-[14px] bg-white border border-gray-300 rounded-full w-full lg:w-[274px]">
              Sắp xếp theo
              <i className="fas fa-chevron-down" />
            </button>
            {dropdownVisible && (
              <div id="myDropdown" className="dropdown-content bg-white border border-gray-300 rounded-lg shadow-lg mt-2 absolute z-20 w-[67%] lg:w-[274px]">
                <button onClick={() => applySort("default")} className="w-[100%] flex justify-start px-4 py-2 text-gray-800 hover:bg-gray-200">Mặc định</button>
                <button onClick={() => applySort("new")} className="w-[100%] flex justify-start px-4 py-2 text-gray-800 hover:bg-gray-200">Mới nhất</button>
                {/* <button onClick={() => applySort("bestSale")} className="w-[100%] flex justify-start px-4 py-2 text-gray-800 hover:bg-gray-200">Được mua nhiều nhất</button>
                <button onClick={() => applySort("favourite")} className="w-[100%] flex justify-start px-4 py-2 text-gray-800 hover:bg-gray-200">Được yêu thích nhất</button> */}
                <button onClick={() => applySort("desc")} className="w-[100%] flex justify-start px-4 py-2 text-gray-800 hover:bg-gray-200">Giá: cao đến thấp</button>
                <button onClick={() => applySort("asc")} className="w-[100%] flex justify-start px-4 py-2 text-gray-800 hover:bg-gray-200">Giá: thấp đến cao</button>
              </div>
            )}
          </div>
          <div className="sidebar-prod lg:hidden">
            <div className="filter-search border pt-2 px-[11px] rounded-tl-lg rounded-br-lg pb-[6px]">
              <div className="dropdown">
                <button className="dropbtn flex items-center">
                  <i className="fa-solid fa-filter" />
                </button>
                <div id="myDropdown" className="dropdown-content bg-white border border-gray-300 rounded-lg shadow-lg mt-2 absolute z-50 w-[76%] lg:w-[274px] hidden lg:block">
                  {/* Content giống với các tùy chọn lọc ở trên */}
                  {/* <div className="mt-4 hidden lg:block">
                          <p className="text-[#221F20]">Mức giá</p>
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
                            <span id="minPrice">{price[0]}đ</span>
                            <span id="maxPrice">{price[1]}đ</span>
                          </div>
                        </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Top_main_prod