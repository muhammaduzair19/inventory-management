import { useGetDashbaordMetricsQuery } from '@/state/api';
import { ShoppingBag } from 'lucide-react';
import Rating from '../(components)/rating';

const CardPopularProduct = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashbaordMetricsQuery();

  return (
    <div className='w-full row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16'>
      {
        isLoading ? (<div className='mt-5'> Loading....</div>) : (
          <>
            <h3 className='text-lg font-semibold px-7 pt-5 pb-2' >
              Popular Products
            </h3>
            <hr />
            <div className='overflow-auto h-full' >
              {
                dashboardMetrics?.popularProducts.map((product) => (
                  <div
                    key={product.productId}
                    className='flex items-center justify-between gap-3 px-5 py-7 border-b'
                  >
                    <div className='flex gap-3 items-center'>
                      <div> img</div>
                      <div className='flex flex-col gap-1 justify-between'>
                        <div className='font-bold text-gray-700'>{product.name}</div>
                        <div className='flex text-sm items-center'>
                          <span className='font-bold text-blue-500 text-xs' >{product.price}</span>
                          <span className='mx-2' >|</span>
                          <Rating rating={product.rating || 0} />
                        </div>
                      </div>
                    </div>
                    <div className='text-xs flex items-center' >
                      <button className='p-2 rounded-full bg-blue-100 text-blue-600 mr-2' >
                        <ShoppingBag className='w-4 h-4' />
                      </button>
                      {Math.round(product.stockQuantity / 1000)}k Sold

                    </div>


                  </div>
                ))
              }
            </div>

          </>
        )
      }


    </div>
  );
};

export default CardPopularProduct;