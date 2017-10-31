import React from 'react';
import DefaultItemCollection from './DefaultItemCollection';

const PaddedTable = () => (
  <DefaultItemCollection tableStyles={{ isPadded: true, isStriped: false }} />
);

const StrippedTable = () => (
  <DefaultItemCollection tableStyles={{ isPadded: false, isStriped: true }} />
);

const AllStylesTable = () => (
  <DefaultItemCollection tableStyles={{ isPadded: true, isStriped: true }} />
);

const TableStyles = () => (
  <div id="TableStyles">
    <h3>Table Style - Padding </h3>
    <PaddedTable />
    <br />
    <h3>Table Style - Stripes </h3>
    <StrippedTable />
    <br />
    <h3>Table Style - Padding and Stripes </h3>
    <AllStylesTable />
  </div>
);

export default TableStyles;
