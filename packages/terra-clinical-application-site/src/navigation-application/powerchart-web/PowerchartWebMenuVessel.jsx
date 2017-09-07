import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Route,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';
import Image from 'terra-image';

import VerticalToolbar from '../common/vertical-toolbar/VerticalToolbar';
import RoutingStack from '../common/RoutingStack';

const propTypes = {
  app: AppDelegate.propType,
  routingManager: PropTypes.object,
};

class PowerchartWebMenuVessel extends React.Component {
  render() {
    const { app, routingManager } = this.props;

    const isCompactLayout = routingManager.isCompactLayout;

    let verticalNavToolbar;
    if (isCompactLayout) {
      const verticalNavItems = [];
      routingManager.routeConfig.navigation.links.forEach((link) => {
        const Component = link.component;
        verticalNavItems.push((
          <div key={link.path} style={{ width: '100%' }}>
            <NavLink to={link.path} activeStyle={{ color: 'white' }} style={{ paddingLeft: '5px' }}>
              <Component />
            </NavLink>
          </div>
        ));
      });

      verticalNavToolbar = (
        <VerticalToolbar>
          {verticalNavItems}
        </VerticalToolbar>
      );
    }

    let menuHeader;
    if (isCompactLayout) {
      menuHeader = (
        <div style={{ height: '45px', display: 'flex', alignItems: 'stretch' }}>
          <div style={{backgroundColor: '#f7f7f7', width: '60px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image variant="rounded" src="http://is3.mzstatic.com/image/thumb/Purple128/v4/8d/8c/67/8d8c67d0-fc56-651a-5f24-1243ef885cd3/source/175x175bb.jpg" height="28px" width="28px" isFluid />
          </div>
          <div style={{ fontSize: '1.3rem', flex: '1 1 auto', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
            <div style={{ paddingLeft: '15px' }}>
              <strong>{this.props.appTitle}</strong>{this.props.appSubtitle}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'grey', paddingLeft: '15px' }}>
              {this.props.userInfo.name}
            </div>
          </div>
        </div>
      );
    }

    const routes = (
      <RoutingStack
        navEnabled
        app={app}
        routeConfig={routingManager.routeConfig.menuRoutes}
        location={location}
        routingManager={routingManager}
      >
        <Route
          render={() => (
            <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
              <h2>Powerchart Web</h2>
            </div>
          )}
        />
      </RoutingStack>
    );

    return (
      <ContentContainer
        fill
        header={menuHeader}
      >
        <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
          <div style={{ flex: '0 0 auto', height: '100%' }}>
            {verticalNavToolbar}
          </div>
          <div style={{ flex: '1 1 auto', position: 'relative' }}>
            {routes}
          </div>
        </div>
      </ContentContainer>
    );
  }
}

PowerchartWebMenuVessel.propTypes = propTypes;

export default PowerchartWebMenuVessel;
