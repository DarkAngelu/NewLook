import React from "react";
import "./Pagination.css";

interface PaginationProps {
	currentPage: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onPageChange,
}) => {
	return (
		<div className="pagination">
			<button
				className="pagination-button"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			<span className="pagination-current">Page {currentPage}</span>
			<button
				className="pagination-button"
				onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === 2}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
