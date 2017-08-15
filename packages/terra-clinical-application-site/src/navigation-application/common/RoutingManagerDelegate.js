import PropTypes from 'prop-types';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const RoutingManagerDelegate = {
  propType: PropTypes.shape({
    size: PropTypes.oneOf(BREAKPOINTS).isRequired,
    managerLocation: PropTypes.object,
    closeMenu: PropTypes.func,
    openMenu: PropTypes.func,
    pinMenu: PropTypes.func,
    unpinMenu: PropTypes.func,
    goToRoot: PropTypes.func,
    goBack: PropTypes.func,
  }),
  clone: (source, overrides) => (
    Object.assign({}, source, overrides)
  ),
};

export default RoutingManagerDelegate;
