import React from 'react';
import DefaultItemCollection from './DefaultItemCollection';

const DividedList = () => (
  <DefaultItemCollection listStyles={{ isDivided: true, hasChevrons: false }} />
);

const ChevronList = () => (
  <DefaultItemCollection listStyles={{ isDivided: false, hasChevrons: true }} />
);

const AllStylesList = () => (
  <DefaultItemCollection listStyles={{ isDivided: true, hasChevrons: true }} />
);

const ListStyles = () => (
  <div id="ListStyles">
    <h3>List Style - Divided </h3>
    <DividedList />
    <br />
    <h3>List Style - Chevrons </h3>
    <ChevronList />
    <br />
    <h3>List Style - Divided and Chevrons </h3>
    <AllStylesList />
  </div>
);

export default ListStyles;
