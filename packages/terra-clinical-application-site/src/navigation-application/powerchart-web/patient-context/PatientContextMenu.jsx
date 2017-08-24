import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

import RoutingManagerDelegate from '../../common/RoutingManagerDelegate';
import MenuToolbar from '../../common/menu-toolbar/MenuToolbar';
import PatientSearch from './patient-search/PatientSearch';
import PatientList from './patient-list/PatientList';
import PatientSchedule from './patient-schedule/PatientSchedule';

const propTypes = {
  routingManager: RoutingManagerDelegate.propType,
};

class PatientContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionType: undefined,
    };
  }
  render() {
    const { routingManager } = this.props;

    let selectionComponent;
    if (this.state.selectionType === 'search') {
      selectionComponent = (
        <PatientSearch />
      );
    } else if (this.state.selectionType === 'list') {
      selectionComponent = (
        <PatientList />
      );
    } else if (this.state.selectionType === 'schedule') {
      selectionComponent = (
        <PatientSchedule />
      );
    }

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
        <ContentContainer
          header={<MenuToolbar text="Patients" routingManager={routingManager} />}
          fill
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', width: '100%' }}>
            <div style={{ flex: '0 0 auto', position: 'relative', borderBottom: '1px solid lightgrey' }}>
              <Button
                text="Patient List" icon={<IconChecklist />} size="medium" variant="link" onClick={() => {
                  this.setState({
                    selectionType: 'list',
                  });
                }}
              />
              <br />
              <Button
                text="Schedule" icon={<IconCalendar />} size="medium" variant="link" onClick={() => {
                  this.setState({
                    selectionType: 'schedule',
                  });
                }}
              />
              <br />
              <Button
                text="Patient Search" icon={<IconSearch />} size="medium" variant="link" onClick={() => {
                  this.setState({
                    selectionType: 'search',
                  });
                }}
              />
            </div>
            <div style={{ flex: '1 1 auto', position: 'relative', backgroundColor: '#f4f4f4' }}>
              {selectionComponent}
            </div>
          </div>
        </ContentContainer>
      </div>
    );
  }
}

PatientContextMenu.propTypes = propTypes;

export default PatientContextMenu;
