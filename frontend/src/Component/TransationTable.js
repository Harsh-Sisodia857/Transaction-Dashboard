import React, { useContext, useEffect, useState } from 'react';
import TransactionContext from '../Context/TransactionContext';
import Pagination from './pagination';

const TransactionTable = () => {
    const context = useContext(TransactionContext);
    const { getTransaction, month, query,page } = context;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [query, page, month]);

    const fetchData = async () => {
        try {
            const perPage = 10;
            const response = await getTransaction(query, page, perPage,month);
            console.log(response)
            setData(response);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };
    return (
        <div className="container py-8">
            <h1 className="text-3xl font-semibold text-blue-500 mb-6 text-center">Transactions Table</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto lg:w-7/8 xl:w-11/12 2xl:w-5/6 mx-auto lg:w-87  divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className='rounded-3xl'>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map(item => (
                            <tr key={item._id} className="hover:bg-gray-100 transition-colors">
                                <td className="px-3 py-2 whitespace-nowrap border-l border-gray-200">{item._id}</td>
                                <td className="px-3 py-2 whitespace-normal max-w-lg border-l border-gray-200">{item.title}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-l border-gray-200">${item.price.toFixed(2)}</td>
                                <td className="px-3 py-2 whitespace-wrap max-w-lg border-l border-gray-200">{item.description}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-l border-gray-200">{item.sold ? 'true' : 'false'}</td>
                                <td className="px-3 py-2 whitespace-nowrap border-l border-gray-200">{item.category}</td>
                                <td className="px-3 py-2 whitespace-nowrap max-w-xl border-l border-gray-200"><img src={item.image} alt="Product" className="h-[9rem] w-[15rem]" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination />
            </div>
        </div>



    );
};

export default TransactionTable;
