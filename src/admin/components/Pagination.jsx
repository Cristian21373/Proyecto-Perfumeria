import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Primera página
        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push('ellipsis-start');
            }
        }

        // Páginas del rango
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Última página
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push('ellipsis-end');
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button
                className={`pagination-btn ${currentPage === 0 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0 || loading}
            >
                ← Anterior
            </button>

            <div className="page-numbers">
                {getPageNumbers().map((pageNumber, index) => {
                    if (pageNumber === 'ellipsis-start' || pageNumber === 'ellipsis-end') {
                        return (
                            <span key={`ellipsis-${index}`} className="page-ellipsis">
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={pageNumber}
                            className={`page-number ${currentPage === pageNumber - 1 ? 'active' : ''}`}
                            onClick={() => onPageChange(pageNumber - 1)}
                            disabled={loading}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                className={`pagination-btn ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1 || loading}
            >
                Siguiente →
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

Pagination.defaultProps = {
    loading: false
};

export default Pagination;