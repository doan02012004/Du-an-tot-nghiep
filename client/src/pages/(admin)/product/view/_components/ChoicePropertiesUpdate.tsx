/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Iproduct } from '../../../../../common/interfaces/product'
import { IColor } from '../../../../../common/interfaces/Color'
import { Button, message, Popconfirm } from 'antd'
import useAttributeMutation from '../../../../../common/hooks/products/useAttributeMutation'
type PropertiesUpdateProps = {
  product: Iproduct
}
const ChoicePropertiesUpdate = ({ product }: PropertiesUpdateProps) => {
  const attributeMutation = useAttributeMutation()
  return (
    <div className=' pb-4 border-b mb-4'>
      <h1 className='font-semibold w-max border-b text-lg mb-4'>1. Xóa thuộc tính</h1>
      <div className='flex gap-x-4 mb-6 '>
        {/* size  */}
        <div className=' basis-1/2 px-3 py-2 shadow shadow-gray-400 rounded-lg'>
          <h5 className='mb-3'>Size hiện có:</h5>
          <div className='flex items-center gap-4 flex-wrap'>
            {product?.sizes?.map((item: string, index: number) => (
              <Popconfirm
                title="Xóa sizes sản phẩm"
                description={<p><span className='text-red'>Khi xóa size, toàn bộ biến thể của size sẽ bị xóa theo.</span><br /><span className='text-blue'> Bạn có muốn xóa không?</span></p>}
                okText="Có"
                cancelText="Không"
                key={index}
                onConfirm={() => {
                  if(product.sizes.length == 1){
                    message.error('Bạn cần để lại ít nhất 1 size')
                  }else{
                    attributeMutation.mutate({ action: 'deleteSize', size: item, productId: product._id })
                  }
                }}
              >
                <Button>{item}</Button>
              </Popconfirm>
            ))}
          </div>
        </div>
        {/* color  */}
        <div className=' basis-1/2 px-3 py-2 shadow shadow-gray-400 rounded-lg'>
        <h5 className='mb-3'>Màu hiện có:</h5>
          <div className='flex items-center gap-4 flex-wrap'>
            {product?.colors?.map((item: IColor, index: number) => (
              <Popconfirm
                title="Xóa màu và ảnh sản phẩm"
                description={<p><span className='text-red'>Khi xóa màu, toàn bộ ảnh và biến thể của màu sẽ bị xóa theo.</span><br /><span className='text-blue'> Bạn có muốn xóa không?</span></p>}
                okText="Có"
                cancelText="Không"
                key={index}
                onConfirm={() => {
                  if (product?.colors?.length == 1) {
                     message.error("Bạn cần để lại ít nhất 1 màu")
                  } else {
                    attributeMutation.mutate({ action: 'deleteColor', color: item, productId: product._id })
                  }
                }}
              >
                <Button>{item.name}</Button>
              </Popconfirm>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChoicePropertiesUpdate