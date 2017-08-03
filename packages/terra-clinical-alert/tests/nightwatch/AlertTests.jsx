/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router';

const AlertTests = () => (
  <div>
    <ul>
      <li><Link to="/tests/alert-tests/default">Alert Default</Link></li>
      <li><Link to="/tests/alert-tests/type">Alert Type</Link></li>
      <li><Link to="/tests/alert-tests/title">Alert Title</Link></li>
    </ul>
  </div>
);

export default AlertTests;
