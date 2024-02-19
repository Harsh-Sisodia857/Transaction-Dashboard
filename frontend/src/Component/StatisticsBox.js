import React, { useEffect, useContext } from 'react';
import TransactionContext from '../Context/TransactionContext';

const StatisticsBox = () => {
    const { SaleAmount, SoldItems, NotSoldItems, getStatistics, month } = useContext(TransactionContext);

    useEffect(() => {
        getStatistics(month);
    }, []);

    const getMonthName = (monthNumber) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1];
    };

    return (
        <div className="bg-gray-100 p-12  rounded-md shadow-md">
            <h2 className="text-3xl font-semibold text-blue-500 text-center mb-6">Statistics for {getMonthName(month)}</h2>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-white w-full md:w-1/3 p-4 flex items-baseline justify-between rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Sale Amount</h3>
                    <p className="text-xl font-bold">{SaleAmount}</p>
                </div>
                <div className="bg-white w-full md:w-1/3 p-4 flex items-baseline justify-between rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Sold Items</h3>
                    <p className="text-xl font-bold">{SoldItems}</p>
                </div>
                <div className="bg-white w-full md:w-1/3 p-4 flex items-baseline justify-between rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Not Sold Items</h3>
                    <p className="text-xl font-bold">{NotSoldItems}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsBox;
