import React, { useContext, useState, useEffect } from 'react'
import TransactionContext from '../Context/TransactionContext';

function Searchbar() {
    const { setQuery } = useContext(TransactionContext);
    const [value, setValue] = useState("");

    useEffect(() => {
        setQuery(value);
    }, [value])

    return (
        <div className="flex justify-center items-center">
            <input
                type="search"
                name="searchpanel"
                id="searchpanel"
                placeholder='Search Transaction'
                className='p-3 w-full mx-10 md:w-[20rem] border border-gray-200 rounded-[30px] outline-none'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default Searchbar;
