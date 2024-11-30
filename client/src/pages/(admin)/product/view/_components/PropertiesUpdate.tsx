/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Iproduct } from '../../../../../common/interfaces/product';
import Tab1 from './Tab1';


type PropertiesUpdate = {
    product:Iproduct
}
const PropertiesUpdate = ({product}:PropertiesUpdate) => {
    
    return (
        <div className=''>
           <Tab1 product={product} />
        </div>
    );
};

export default PropertiesUpdate