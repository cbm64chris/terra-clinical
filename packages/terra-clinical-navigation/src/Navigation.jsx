import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import breakpoints from 'terra-responsive-element/lib/breakpoints.scss';
import ContentContainer from 'terra-content-container';
import { navigationConfigPropType, configHasMatchingRoute } from './RoutingConfigUtils';
import Layout from 'terra-clinical-layout';

import MenuHeader from './menu-header/MenuHeader';

const propTypes = {
  routeConfig: navigationConfigPropType,
  location: PropTypes.object,
  forceToggleAvailable: PropTypes.bool, // Need this to expose toggle when router is not used with layout
  app: AppDelegate.propType,
  applicationToolbar: PropTypes.element,
  menuRoutingVessel: PropTypes.element,
  contentRoutingVessel: PropTypes.element,
};

class Navigation extends React.Component {
  static getBreakpointSize() {
    const width = window.innerWidth;
    const { small, medium, large, huge } = breakpoints;

    if (width >= 1440) {
      return 'huge';
    } else if (width >= 1216) {
      return 'large';
    } else if (width >= 992) {
      return 'medium';
    } else if (width >= 768) {
      return 'small';
    }
    return 'tiny';
  }

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePin = this.togglePin.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.isCompactLayout = this.isCompactLayout.bind(this);
    this.renderApplicationToolbar = this.renderApplicationToolbar.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderContent = this.renderContent.bind(this);

    const initialSize = Navigation.getBreakpointSize();

    this.state = {
      menuIsOpen: false,
      menuIsPinned: false,
      toggleIsAvailable: configHasMatchingRoute(props.location.pathname, props.routeConfig.menuRoutes, initialSize) || props.forceToggleAvailable,
      size: initialSize,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    const toggleIsAvailable = configHasMatchingRoute(nextProps.location.pathname, nextProps.routeConfig.menuRoutes, this.state.size) || nextProps.forceToggleAvailable;

    if (toggleIsAvailable !== this.state.toggleIsAvailable) {
      this.setState({
        toggleIsAvailable,
        menuIsOpen: toggleIsAvailable && this.state.menuIsOpen,
        menuIsPinned: toggleIsAvailable && this.state.menuIsPinned,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    const newSize = RoutingManager.getBreakpointSize();

    if (this.state.size !== newSize) {
      const newToggleIsAvailable = configHasMatchingRoute(this.props.location.pathname, this.props.routeConfig.menuRoutes, newSize) || this.props.forceToggleAvailable;

      const newMenuIsPinned = newToggleIsAvailable && (newSize !== 'tiny' && newSize !== 'small') && this.state.menuIsPinned;

      const newMenuIsOpen = newToggleIsAvailable && this.state.menuIsOpen && newMenuIsPinned;
      this.setState({
        size: newSize,
        toggleIsAvailable: newToggleIsAvailable,
        menuIsOpen: newMenuIsOpen,
        menuIsPinned: newMenuIsPinned,
      });
    }
  }

  toggleMenu() {
    if (!this.state.menuIsPinned) {
      this.setState({
        menuIsOpen: !this.state.menuIsOpen,
      });
    }
  }

  togglePin() {
    this.setState({
      menuIsPinned: !this.state.menuIsPinned,
    });
  }

  isCompactLayout() {
    return this.state.size === 'tiny' || this.state.size === 'small';
  }

  renderApplicationToolbar() {
    const { app, routeConfig, applicationToolbar } = this.props;
    const { size, menuIsOpen } = this.state;

    if (!applicationToolbar) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();
    const shouldDisplayMenuToggle = isCompactLayout || this.state.toggleIsAvailable;

    return React.cloneElement(applicationToolbar, {
      app,
      routingManager: {
        size,
        location,
        routeConfig,
        isCompactLayout,
        toggleMenu: shouldDisplayMenuToggle && this.toggleMenu,
        menuIsOpen,
      },
      onToggleClick: shouldDisplayMenuToggle ? this.toggleMenu : undefined,
    });
  }

  renderMenu() {
    const { app, routeConfig, menuRoutingVessel } = this.props;
    const { size, menuIsOpen, menuIsPinned } = this.state;

    if (!menuRoutingVessel) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();
    const vessel = React.cloneElement(menuRoutingVessel, {
      app,
      routingManager: {
        size,
        location,
        routeConfig,
        isCompactLayout,
        toggleMenu: this.toggleMenu,
        menuIsOpen,
        togglePin: !isCompactLayout ? this.togglePin : undefined,
        menuIsPinned: !isCompactLayout ? menuIsPinned : undefined,
      },
    });

    return (
      <ContentContainer
        fill
        header={!isCompactLayout ? (
          <MenuHeader
            text="Menu"
            togglePin={!isCompactLayout ? this.togglePin : undefined}
            isPinned={!isCompactLayout ? menuIsPinned : undefined}
          />
        ) : undefined}
      >
        {vessel}
      </ContentContainer>
    );
  }

  renderContent() {
    const { app, routeConfig, contentRoutingVessel } = this.props;
    const { size, menuIsOpen } = this.state;

    if (!contentRoutingVessel) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();

    return (
      <ContentContainer
        fill
        header={isCompactLayout && this.renderApplicationToolbar()}
      >
        {(
          React.cloneElement(contentRoutingVessel, {
            app,
            routingManager: {
              size,
              location,
              routeConfig,
              isCompactLayout,
              toggleMenu: this.toggleMenu,
              menuIsOpen,
            },
          })
        )}
      </ContentContainer>
    );
  }

  render() {
    const { menuIsOpen, menuIsPinned, size } = this.state;
    const { applicationToolbar, contentRoutingVessel, menuRoutingVessel, menuText, ...customProps } = this.props;

    return (
      <Layout
        {...customProps}
        header={this.renderApplicationToolbar()}
        menu={this.renderMenu()}
        menuText={menuText}
      >
        {contentRoutingVessel}
      </Layout>
    );
  }
}

Navigation.propTypes = propTypes;

export default withRouter(Navigation);
