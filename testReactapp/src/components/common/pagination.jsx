import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { pageSize, currentPage, itemsCount, onPageChange } = props;
  const pagecount = Math.ceil(itemsCount / pageSize);
  if (pagecount === 1) return null;
  const pages = _.range(1, pagecount + 1);
  //console.log(itemsCount);

  return (
    <div>
      <nav>
        <ul className="pagination">

          <li className={currentPage===1?"page-item disabled":"clickable page-item"}>
            <a onClick={()=>props.onPrevClick(currentPage)} className="page-link">&laquo;</a>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "clickable page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}

          <li className={currentPage===pagecount?"page-item disabled":"clickable page-item"}>
            <a onClick={()=>props.onNextClick(currentPage)} className="page-link">
            &raquo;
            </a>
          </li>

        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
