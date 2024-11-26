import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageClick = (pageNo) => {
        onPageChange(pageNo);
    };

    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= halfVisible) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + halfVisible >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfVisible;
            endPage = currentPage + halfVisible;
        }
    }

    const arrayOfPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <>
            <nav aria-label="Page navigation">
                <div className="d-flex justify-content-end">
                    <ul className="pagination">
                        {/* First Page */}
                        <li className="page-item">
                            <a className="page-link" onClick={() => handlePageClick(1)} aria-label="First">
                                <span aria-hidden="true">&laquo;&laquo;</span> {/* Adjust this to your desired icon */}
                            </a>
                        </li>
                        {/* Previous Page */}
                        <li className="page-item">
                            <a className="page-link" onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {/* Page Numbers */}
                        {arrayOfPages.map((pageNo) => (
                            <li className={`page-item ${currentPage === pageNo ? 'active' : ''}`} key={pageNo}>
                                <a className="page-link" onClick={() => handlePageClick(pageNo)}>
                                    {pageNo}
                                </a>
                            </li>
                        ))}
                        {/* Next Page */}
                        <li className="page-item">
                            <a className="page-link" onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : totalPages)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        {/* Last Page */}
                        <li className="page-item">
                            <a className="page-link" onClick={() => handlePageClick(totalPages)} aria-label="Last">
                                <span aria-hidden="true">&raquo;&raquo;</span> {/* Adjust this to your desired icon */}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}