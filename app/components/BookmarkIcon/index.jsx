import React from 'react';

const BookmarkIcon = ({ isBookmarked }) => (
  <svg
    xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlnssvg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    width="30px"
    className="click-btn"
    fill={isBookmarked ? '#0485c2' : 'grey'}
    viewBox="0 0 384 512"
    version="1.1">
    <path
      opacity={isBookmarked ? '0.5' : '1'}
      d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z"
      id="path2"
    />
    <path
      className="click-btn"
      fill={isBookmarked ? '#0485c2' : 'rgb(215, 230, 233)'}
      d="M 49.343925,238.4541 49.898305,50.115254 191.51968,49.55715 c 112.14594,-0.441947 141.8379,0.0096 142.66177,2.169491 0.57222,1.500178 0.78837,86.346699 0.48032,188.547829 l -0.56008,185.82022 -70.24613,-41.00667 c -38.63538,-22.55366 -70.97059,-41.00666 -71.85602,-41.00666 -1.14647,0 -120.324992,68.78963 -141.57087,81.71444 -0.901519,0.54842 -1.389655,-83.75533 -1.084745,-187.3417 z"
    />
  </svg>
);

export default BookmarkIcon;
