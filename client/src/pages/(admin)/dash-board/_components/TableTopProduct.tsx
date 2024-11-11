

const TableTopProduct = () => {
    const customers = [
        {
          id: '0',
          image: 'https://picsum.photos/id/35/300/300',
          name: 'Alex Shatov',
          email: 'alexshatov@gmail.com',
          location: 'Hà Nội',
          spent: '$2,890.66',
        },
        {
          id: '1',
          image: 'https://picsum.photos/id/36/300/300',
          name: 'Philip Harbach',
          email: 'philip.h@gmail.com',
          location: 'Hà Nội',
          spent: '$2,767.04',
        },
        {
          id: '2',
          image: 'https://picsum.photos/id/37/300/300',
          name: 'Mirko Fisuk',
          email: 'mirkofisuk@gmail.com',
          location: 'Hà Nội',
          spent: '$2,996.00',
        },
        {
          id: '3',
          image: 'https://picsum.photos/id/38/300/300',
          name: 'Olga Semklo',
          email: 'olga.s@cool.design',
          location: 'Hà Nội',
          spent: '$1,220.66',
        },
        {
          id: '4',
          image: 'https://picsum.photos/id/39/300/300',
          name: 'Burak Long',
          email: 'longburak@gmail.com',
          location: 'Hà Nội',
          spent: '$1,890.66',
        },
      ];
    
      return (
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 p-3 shadow-lg shadow-gray-300 rounded-lg">
          <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Sản phẩm</h2>
          </header>      
          <div className="p-3">
    
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Spent</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Country</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {
                    customers.map(customer => {
                      return (
                        <tr key={customer.id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                              </div>
                              <div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{customer.email}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">{customer.spent}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-sm text-center">{customer.location}</div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
    
            </div>
    
          </div>
        </div>
      );
}

export default TableTopProduct