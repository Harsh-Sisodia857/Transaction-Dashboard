import React, { useContext, useState, useEffect } from 'react';
import TransactionContext from '../Context/TransactionContext';

const MonthDropdown = () => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const { setMonth } = useContext(TransactionContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("March");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectMonth = (month) => {
        setSelectedMonth(month);
        setIsOpen(false);
    };

    useEffect(() => {
        const monthIndex = months.findIndex((m) => m === selectedMonth);
        if (monthIndex !== -1) {
            const monthNumber = monthIndex + 1; 
            setMonth(monthNumber);
        }
    }, [selectedMonth]);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-center min-w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
                {selectedMonth}
                <span className={`ml-2 inline-block transition-transform transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {months.map((month, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectMonth(month)}
                                className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedMonth === month ? 'bg-gray-100' : ''}`}
                                role="menuitem"
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthDropdown;
