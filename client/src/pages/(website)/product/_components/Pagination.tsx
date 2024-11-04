import React from 'react'
import { useFilterParams } from '../../../../common/hooks/products/useFilter'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Props = {
  dataPage: {
    currentPage: number,
    totalPage: number
  }
}

const Pagination = ({ dataPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { setFilterParams, getFiltersFromUrl } = useFilterParams();
  const navigate = useNavigate();


  const handleApply = (pageData: any) => {
    console.log(pageData)
    const params = setFilterParams({ page: pageData });
    navigate(`?${params?.toString()}`);
  };

  return (
    <>
      <ul className="list-inline-pagination flex justify-center items-center lg:mt-[70px]  mt-[32px]">
        {dataPage?.currentPage > 1 && (
          <li onClick={() => handleApply(1)} className="mr-[17px] lg:mx-2 hidden lg:block"><span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">Trang đầu</span></li>
        )}
        <li onClick={() => { if (dataPage?.currentPage > 1) { handleApply(dataPage?.currentPage - 1) } }} className="mr-[17px] lg:mx-2"><span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">«</span></li>
        {Array.from({ length: dataPage?.totalPage }, (_, i) => (
          <li key={i} onClick={() => { if (dataPage?.currentPage !== i + 1) { handleApply(i + 1) } }} className="mr-[17px] lg:mx-2"><span className={`${dataPage?.currentPage == i + 1 ? 'bg-black text-white' : 'bg-white '} block cursor-pointer py-2 px-4 border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg`}>{i + 1}</span></li>
        ))}
        <li onClick={() => {
          if (dataPage?.currentPage < dataPage?.totalPage) {
            handleApply(Math.min(dataPage?.currentPage + 1, dataPage?.totalPage));
          }
        }}
          className="mr-[17px] lg:mx-2">
          <span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg">»</span>
        </li>

        {dataPage?.currentPage !== dataPage?.totalPage && (
          <li onClick={() => { handleApply(dataPage?.totalPage) }} className="mr-[17px] lg:mx-2 hidden lg:block"><span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">Trang cuối</span></li>
        )}
      </ul>
    </>
  )
}

export default Pagination
