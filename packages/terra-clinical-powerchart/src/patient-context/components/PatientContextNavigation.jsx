import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import PatientContextToolbar from './PatientContextToolbar';
import PatientContextMenu from './PatientContextMenu';
import PatientSelectionLanding from './PatientSelectionLanding';
import PatientSchedule from '../../PatientSchedule';
import PatientSearch from '../../PatientSearch';
import PatientChartNavigation from './PatientChartNavigation';


import './PatientContextNavigation.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  navManager: NavManagerDelegate.propType,
  navigationUpdateId: PropTypes.string,
  navigationData: PropTypes.object,
  updateNavigation: PropTypes.func,
};

const defaultProps = {
  navigationData: {},
};

AppDelegate.registerComponentForDisclosure('PatientSchedule', PatientSchedule);
AppDelegate.registerComponentForDisclosure('PatientSearch', PatientSearch);

class PatientContentNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.discloseSearch = this.discloseSearch.bind(this);
    this.discloseSchedule = this.discloseSchedule.bind(this);
    this.loadPatient = this.loadPatient.bind(this);
  }

  discloseSearch() {
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `PatientSearch-${Date.now()}`,
          name: 'PatientSearch',
        },
      });
    }
  }

  discloseSchedule() {
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `PatientSearch-${Date.now()}`,
          name: 'PatientSearch',
        },
      });
    }
  }

  loadPatient() {
    this.props.updateNavigation({ patient: { id: 1, name: 'Pete' } });
  }

  render() {
    const {
      app,
      navManager,
      navigationData,
      navigationUpdateId,
      updateNavigation,
    } = this.props;

    let searchToolbar;
    if (navManager.size !== 'small' && navManager.size !== 'tiny' && (navigationData && navigationData.patient)) {
      searchToolbar = <PatientContextToolbar app={app} onSelectSearch={this.loadPatient} onSelectSchedule={this.discloseSchedule} />;
    }

    const navProps = {
      app,
      contentParent: <ContentContainer header={searchToolbar} fill />,
      menuBreakpoint: 'small',
      menuClass: PatientContextMenu,
      menuProps: { updateNavigation },
      navManager,
    };

    let content;
    if (navigationData.patient) {
      // content = <PatientSelectionLanding />;
      content = (
        <PatientChartNavigation patient={navigationData.patient} key={navigationUpdateId} />
      );
    } else {
      content = <PatientSelectionLanding onPatientSearchSelected={this.loadPatient} />;
    }

    return (
      <Navigation className="terraClinical-PatientContext" {...navProps}>
        {content}
      </Navigation>
    );
  }
}

PatientContentNavigation.propTypes = propTypes;
PatientContentNavigation.defaultProps = defaultProps;

export default navigation_hoc('PatientContext')(PatientContentNavigation);

const reducers = Object.assign({}, navigationReducers);
export { reducers };
