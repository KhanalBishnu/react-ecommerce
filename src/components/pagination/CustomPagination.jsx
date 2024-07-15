import { Pagination } from '@mui/material';
import React from 'react';

const CustomPagination = ({ totalPages, currentPage, onPageChange,limit }) => {
  const pageNumbers = [];
  let paginationValue=Math.ceil(totalPages / limit);
  for (let i = 1; i <= paginationValue; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation example ">
      {/* <ul className="pagination d-flex justify-content-center ">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => onPageChange(currentPage - 1)}>Previous</a>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <a className="page-link" href="#" onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === paginationValue ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => onPageChange(currentPage + 1)}>Next</a>
        </li>
      </ul> */}
       <Pagination
            count={paginationValue}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            sx={{ mt: 4 }}
        />
    </nav>
  );
};
export default CustomPagination;
