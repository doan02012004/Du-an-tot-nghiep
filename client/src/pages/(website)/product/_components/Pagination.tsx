import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFilterParams } from '../../../../common/hooks/products/useFilter'

type Props = {
  dataPage: {
    currentPage: number,
    totalPage: number
  }
}

const Pagination = ({ dataPage }: Props) => {
  const { setFilterParams,} = useFilterParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const handleApply = (pageData: any) => {

    const params = setFilterParams();
    navigate(`?${params?.toString()}`);
    searchParams.set('page', pageData.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <ul className="list-inline-pagination flex justify-center items-center lg:mt-[70px] mt-[32px]">
        {dataPage?.currentPage > 1 && (
          <li onClick={() => handleApply(1)} className="mr-[17px] lg:mx-2 hidden lg:block">
            <span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg">
              Trang đầu
            </span>
          </li>
        )}

        <li onClick={() => {
          if (dataPage?.currentPage > 1) {
            handleApply(dataPage?.currentPage - 1);
          }
        }} className="mr-[17px] lg:mx-2">
          <span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg">«</span>
        </li>

        {Array.from({ length: Math.min(5, dataPage?.totalPage) }, (_, i) => {
          const startPage = Math.max(1, Math.min(dataPage?.currentPage - 2, dataPage?.totalPage - 4));
          const page = startPage + i;

          return (
            <li key={page} onClick={() => {
              if (dataPage?.currentPage !== page) {
                handleApply(page);
              }
            }} className="mr-[17px] lg:mx-2">
              <span className={`${dataPage?.currentPage == page ? 'bg-black text-white' : 'bg-white'} block cursor-pointer py-2 px-4 border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg`}>
                {page}
              </span>
            </li>
          );
        })}
        <li onClick={() => {
          if (dataPage?.currentPage < dataPage?.totalPage) {
            
            handleApply(Math.min(Number(dataPage?.currentPage) + 1, dataPage?.totalPage));
          }
        }} className="mr-[17px] lg:mx-2">
          <span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg">»</span>
        </li>


        {Number(dataPage?.currentPage) !== dataPage?.totalPage && (
          <li onClick={() => handleApply(dataPage?.totalPage)} className="mr-[17px] lg:mx-2 hidden lg:block">
            <span className="block cursor-pointer py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg">
              Trang cuối
            </span>
          </li>
        )}
      </ul>

    </>
  )
}

export default Pagination
