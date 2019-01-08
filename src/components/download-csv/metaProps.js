import React from 'react';
import PropTypes from 'prop-types';


export const propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  headers: PropTypes.array,
  target: PropTypes.string,
  separator: PropTypes.string,
  filename: PropTypes.string,
  uFEFF: PropTypes.bool,
  onClick: PropTypes.func,
  asyncOnClick: PropTypes.bool
};

export const defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv',
  uFEFF: true,
  asyncOnClick: false
};

export const PropsNotForwarded = [
  `data`,
  `headers`
];

// export const DownloadPropTypes = Object.assign(
//   {},
//   PropTypes,
//   {
//     : ,
//   }
// );
