import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';
import MenuToolbar from '../common/MenuToolbar';

const HomeMenu = ({ routingManager }) => (
  <div style={{ height: '100%', width: '100%', backgroundColor: 'lightseagreen', position: 'absolute' }}>
    <MenuToolbar routingManager={routingManager} />
    <ul>
      <li><Link to={{ pathname: '/allergies' }}>Allergies</Link></li>
      <li><Link to="/orders">Orders</Link></li>
    </ul>
  </div>
);

export default HomeMenu;
