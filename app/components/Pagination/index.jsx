import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Pagination = ({ pages, currentpage, isStoryPage }) => {
  if (pages < 2) return <div />;

  const currentPage = parseInt(currentpage);
  let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
  let endPage = currentPage + 2 < pages ? currentPage + 2 : pages;

  if (currentPage < 3) {
    const increase = 3 - currentPage;
    endPage = endPage + increase < pages ? endPage + increase : pages;
  }

  if (endPage > pages - 2) {
    const increase = -(pages - currentPage - 2);
    startPage = startPage - increase > 0 ? startPage - increase : 1;
  }

  const pagination = [];

  if (currentPage > pages) {
    startPage = 1;
    endPage = pages < 5 ? pages : 5;
  }

  if (startPage > 1) pagination.push(0);
  for (let pageNo = startPage; pageNo <= endPage; pageNo++) pagination.push(pageNo);
  if (endPage < pages) pagination.push(-1);

  return (
    <div className="pagination">
      <Link
        to={
          isStoryPage
            ? `/stories/page/${currentPage - 1 > 0 ? currentPage - 1 : 1}`
            : `/photos/page/${currentPage - 1 > 0 ? currentPage - 1 : 1}`
        }
        className="prev link">
        <i className="fas fa-angle-left" />
      </Link>
      {pagination.map(item => {
        if (item === 0) {
          return (
            <Link to={isStoryPage ? `/stories/page/1` : `/photos/page/1`} key={item} className="num link    ">
              First
            </Link>
          );
        }
        if (item === -1) {
          return (
            <Link to={isStoryPage ? `/stories/page/${pages}` : `/photos/page/${pages}`} key={item} className="num link">
              Last
            </Link>
          );
        }
        if (item === currentPage) {
          return (
            <Link
              to={isStoryPage ? `/stories/page/${item}` : `/photos/page/${item}`}
              key={item}
              className="num link active">
              {item}
            </Link>
          );
        }
        return (
          <Link to={isStoryPage ? `/stories/page/${item}` : `/photos/page/${item}`} key={item} className="num link">
            {item}
          </Link>
        );
      })}
      <Link
        to={
          isStoryPage
            ? `/stories/page/${currentPage + 1 <= pages ? currentPage + 1 : pages}`
            : `/photos/page/${currentPage + 1 <= pages ? currentPage + 1 : pages}`
        }
        className="next link">
        <i className="fas fa-angle-right" />
      </Link>
    </div>
  );
};

export default Pagination;
