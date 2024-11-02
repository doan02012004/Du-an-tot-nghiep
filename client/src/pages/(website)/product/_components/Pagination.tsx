import React from 'react'
import { useFilterParams } from '../../../../common/hooks/products/useFilter'
import { useSearchParams } from 'react-router-dom'

type Props = {
  dataPage: {
    currentPage: number,
    totalPage: number
  }
}

const Pagination = ({ dataPage }: Props) => {
  const [searchParams,setSearchParams] = useSearchParams()
  const {setFilterParams, getFiltersFromUrl} = useFilterParams();

  const data = getFiltersFromUrl();
  
  return (
    <>
        <ul className="list-inline-pagination flex justify-center items-center lg:mt-[70px]  mt-[32px]">
         {dataPage?.currentPage > 1 && (
          <li onClick={()=> {searchParams.set('page','1'); setSearchParams(searchParams) }} className="mr-[17px] lg:mx-2 hidden lg:block"><span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">Trang đầu</span></li>
         )}
          <li onClick={()=> {if(dataPage?.currentPage > 1){searchParams.set('page',`${dataPage?.currentPage - 1}`); setSearchParams(searchParams)} }} className="mr-[17px] lg:mx-2"><span  className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">«</span></li>
            {Array.from({length:dataPage?.totalPage},(_,i) => (
              <li key={i} onClick={()=> {if(dataPage?.currentPage !== i+1){searchParams.set('page',`${i+1}`); setSearchParams(searchParams)} }} className="mr-[17px] lg:mx-2"><span className={`${dataPage?.currentPage== i+1 ?'bg-black text-white':'bg-white '} block cursor-pointer py-2 px-4 border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg`}>{i+1}</span></li>
            ))}
             <li onClick={()=> {if(dataPage?.currentPage < dataPage?.totalPage){searchParams.set('page',`${dataPage?.currentPage + 1}`); setSearchParams(searchParams)} }} className="mr-[17px] lg:mx-2"><span  className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">»</span></li>
            {dataPage?.currentPage !== dataPage?.totalPage && (
               <li onClick={()=> {searchParams.set('page',`${dataPage?.totalPage}`); setSearchParams(searchParams) }} className="mr-[17px] lg:mx-2 hidden lg:block"><span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">Trang cuối</span></li>
            )}
                  {/* <li className="mr-[17px] lg:mx-2"><a href="#" className="block py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">«</a></li>
                  <li className="mr-[17px] lg:mx-2"><a href="#" className="block py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">1</a></li>
                  <li className="mr-[17px] lg:mx-2"><a href="#" className="block py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">2</a></li>
                  <li className="mr-[17px] lg:mx-2"><a href="#" className="block py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">3</a></li>
                  <li className=" lg:mx-2"><a href="#" className="block py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">»</a></li>
                  <li className="mr-[17px] lg:mx-2 hidden lg:block"><a href="#" className="block py-2 px-4 bg-white border hover:bg-black hover:text-white  rounded-tl-lg rounded-br-lg">Trang cuối</a></li> */}
        </ul>
    </>
  )
}

export default Pagination
