import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import ContentContainer from 'terra-content-container';
import SlideGroup from 'terra-slide-group';
import SlidePanel from 'terra-slide-panel';

import './NavigationManager.scss';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will be displayed within the content body of secondary navigation
   **/
  children: PropTypes.node,
  /**
   * Component that will managed primary navigation actions.
   **/
  toolbar: PropTypes.element,
};

const defaultProps = {
  children: [],
};

class NavigationManager extends React.Component {
  getBreakpointSize() {
    const width = window.innerWidth;
    const { small, medium, large, huge } = getBreakpoints();

    if (width >= huge) {
      return 'huge';
    } else if (width >= large) {
      return 'large';
    } else if (width >= medium) {
      return 'medium';
    } else if (width >= small) {
      return 'small';
    }
    return 'tiny';
  }

  constructor(props) {
    super(props);

    this.state = { size: 'default', openIndex: -1, hasMenu: false, isOpen: true };
    this.menuStack = [];
    this.getBreakpointSize = this.getBreakpointSize.bind(this);
    this.registerNavigation = this.registerNavigation.bind(this);
    this.deregisterNavigation = this.deregisterNavigation.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.presentRootMenu = this.presentRootMenu.bind(this);
    this.presentParentMenu = this.presentParentMenu.bind(this);
    this.presentMenuAtIndex = this.presentMenuAtIndex.bind(this);
    this.firstValidMenuIndex = this.firstValidMenuIndex.bind(this);
    this.lastValidMenuIndex = this.lastValidMenuIndex.bind(this);
    this.hasMenu = this.hasMenu.bind(this);
    this.shouldDisplayMenu = this.shouldDisplayMenu.bind(this);
    this.buildToolbar = this.buildToolbar.bind(this);
    this.buildChildren = this.buildChildren.bind(this);
    this.buildMenu = this.buildMenu.bind(this);

    this.validateMenusAtCurrentSize = this.validateMenusAtCurrentSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.validateMenusAtCurrentSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.validateMenusAtCurrentSize);
  }

  registerNavigation(index, menuData) {
    this.menuStack[index] = menuData;

    const newState = {};

    const newHasMenu = this.hasMenu();
    if (this.state.hasMenu !== newHasMenu) {
      newState.hasMenu = newHasMenu;
    }

    if (this.state.isOpen) {
      newState.openIndex = index;
    }

    this.setState(newState);
  }

  deregisterNavigation(index) {
    if (this.menuStack[index]) {
      this.menuStack.splice(index);

      let newState;
      const newHasMenu = this.hasMenu();
      if (this.state.hasMenu !== newHasMenu) {
        newState = { hasMenu: newHasMenu };
      }

      if (this.state.openIndex >= index) {
        newState = {
          openIndex: -1,
          isOpen: false,
        };
      }

      if (newState) {
        this.setState(newState);
      }
    }
  }

  toggleMenu() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true, openIndex: this.lastValidMenuIndex(this.menuStack.length) });
    }
  }

  presentRootMenu() {
    this.presentMenuAtIndex(this.firstValidMenuIndex(0));
  }

  presentParentMenu() {
    this.presentMenuAtIndex(this.lastValidMenuIndex(this.state.openIndex - 1));
  }

  presentMenuAtIndex(nextIndex) {
    const currentIndex = this.state.openIndex;

    if (nextIndex >= 0 && currentIndex !== nextIndex) {
      this.setState({ openIndex: nextIndex });
    } else {
      this.setState({ isOpen: false, openIndex: -1 });
    }
  }

  firstValidMenuIndex(startIndex) {
    for (let i = startIndex; i < this.menuStack.length; i += 1) {
      if (this.shouldDisplayMenu(this.menuStack[i])) {
        return i;
      }
    }
    return -1;
  }

  lastValidMenuIndex(startIndex) {
    for (let i = startIndex; i >= 0; i -= 1) {
      if (this.shouldDisplayMenu(this.menuStack[i])) {
        return i;
      }
    }
    return -1;
  }

  hasMenu() {
    return this.firstValidMenuIndex(0) >= 0;
  }

  shouldDisplayMenu(menu) {
    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    return menu && BREAKPOINTS.indexOf(size) <= BREAKPOINTS.indexOf(menu.breakpoint);
  }

  buildToolbar(app, size, toolbar) {
    let toggle;
    if (this.state.hasMenu) {
      toggle = this.toggleMenu;
    }
    if (toolbar) {
      return React.cloneElement(toolbar, { app, size, onToggleClick: toggle });
    }
    return <NavigationToolbar app={app} size={size} onToggleClick={toggle} />;
  }

  buildChildren(app, size, children) {
    const newChildProps = {
      app,
      size,
      index: 0,
      registerNavigation: this.registerNavigation,
      deregisterNavigation: this.deregisterNavigation,
      toggleMenu: this.toggleMenu,
    };

    return React.Children.map(children, child => (
      React.cloneElement(child, newChildProps)
    ));
  }

  buildMenu(app, size) {
    const basicProps = {
      app,
      toggleMenu: this.toggleMenu,
      size,
    };

    const additionalProps = {
      presentRootMenu: this.presentRootMenu,
      presentParentMenu: this.presentParentMenu,
    };

    const validMenus = this.menuStack.filter((menu, index) => (
      this.shouldDisplayMenu(menu) && this.state.openIndex >= index
    ));

    const slideItems = validMenus.map((menu, index) => {
      const ComponentClass = menu.class;
      const slideKey = `NavigationSlide-${index}`;
      if (index > 0) {
        return <ComponentClass {...menu.props} {...basicProps} {...additionalProps} key={slideKey} />;
      }
      return <ComponentClass {...menu.props} {...basicProps} key={slideKey} />;
    });

    if (!this.state.isOpen && slideItems.length) {
      return slideItems[slideItems.length - 1];
    }

    return <SlideGroup items={slideItems} isAnimated />;
  }

  validateMenusAtCurrentSize() {
    const size = this.getBreakpointSize();
    if (size !== this.state.size) {
      const newState = { size, isOpen: false };
      const newHasMenu = this.hasMenu();
      if (this.state.hasMenu !== newHasMenu) {
        newState.hasMenu = newHasMenu;
      }
      this.setState(newState);
    }
  }

  render() {
    const {
      app,
      children,
      toolbar,
      ...customProps } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationManager',
      customProps.className,
    ]);

    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    const toolbarContent = this.buildToolbar(app, size, toolbar);
    const childContent = this.buildChildren(app, size, children);
    const menuContent = this.buildMenu(app, size);
    return (
      <ContentContainer {...customProps} className={navigationClassNames} header={toolbarContent} fill>
        <SlidePanel
          mainContent={childContent}
          panelContent={menuContent}
          panelSize="small"
          panelBehavior="squish"
          panelPosition="start"
          isOpen={this.state.isOpen}
          fill
        />
      </ContentContainer>
    );
  }
}

NavigationManager.propTypes = propTypes;
NavigationManager.defaultProps = defaultProps;

export default NavigationManager;