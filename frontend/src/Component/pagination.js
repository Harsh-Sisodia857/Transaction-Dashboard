import React, { useContext } from "react";
import TransactionContext from "../Context/TransactionContext";

const Pagination = () => {
  const { page, setPage, totalItem } = useContext(TransactionContext);
  const perPage = 10;
  const pageCount = Math.ceil(totalItem / perPage);

  const handlePrev = (e) => {
    e.preventDefault();
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (page === pageCount) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <div className="flex justify-between w-full lg:w-7/8 xl:w-11/12 2xl:w-5/6 mx-auto lg:w-87 items-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div>
        Page No: {page} of {pageCount}
      </div>
      <div>
        <button
          onClick={(e) => handlePrev(e)}
          disabled = {page == 1 ? true : false}
          className={`px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
        >
          Prev
        </button>
        <span>-</span>
        <button
          onClick={(e) => handleNext(e)}
          disabled={page == pageCount ? true : false}
          className={`px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
        >
          Next
        </button>
      </div>
      <div>
        Per Page: {perPage}
      </div>
    </div>
  );
};

export default Pagination;
