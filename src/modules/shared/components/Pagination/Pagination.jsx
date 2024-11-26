import React from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageClick = (pageNo) => {
        onPageChange(pageNo);
      };
    
      const arrayOfPages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

return ( <>

<nav aria-label="Page navigation">
    <ul className="pagination">
        <li className="page-item">
            <a className="page-link" onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : 1)} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        {arrayOfPages.map((pageNo) => (
            <li className={`page-item ${currentPage === pageNo ? 'active' : ''}`} key={pageNo}>
            <a className="page-link" onClick={() => handlePageClick(pageNo)}>
                {pageNo}
            </a>
            </li>
        ))}
        <li className="page-item">
            <a className="page-link" onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : totalPages)} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>

</>
    
);
}
