import React from 'react';
import AppDelegate from 'terra-app-delegate';

import Layout from '../../src/Layout';
import { getBreakpointSize } from '../../src/utilities';

jest.mock('../../src/utilities');

describe('Layout', () => {
  it('should render a Layout without optional props', () => {
    getBreakpointSize.mockImplementation(() => 'tiny');

    const result = shallow((
      <Layout />
    ));
    expect(result).toMatchSnapshot();
  });

  describe('Menu Disabled', () => {
    const layout = (
      <Layout
        app={AppDelegate.create({
          disclose: () => {},
        })}
        toolbar={<div>Test Toolbar</div>}
        menu={<div>Test Menu</div>}
        content={<div>Test Content</div>}
      />
    );

    it('should render a Layout when tiny', () => {
      getBreakpointSize.mockImplementation(() => 'tiny');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when small', () => {
      getBreakpointSize.mockImplementation(() => 'small');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when medium', () => {
      getBreakpointSize.mockImplementation(() => 'medium');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when large', () => {
      getBreakpointSize.mockImplementation(() => 'large');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when huge', () => {
      getBreakpointSize.mockImplementation(() => 'huge');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Menu Enabled', () => {
    const layout = (
      <Layout
        app={AppDelegate.create({
          disclose: () => {},
        })}
        toolbar={<div>Test Toolbar</div>}
        menu={<div>Test Menu</div>}
        content={<div>Test Content</div>}
        enableMenu
      />
    );

    it('should render a Layout when tiny', () => {
      getBreakpointSize.mockImplementation(() => 'tiny');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when small', () => {
      getBreakpointSize.mockImplementation(() => 'small');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when medium', () => {
      getBreakpointSize.mockImplementation(() => 'medium');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when large', () => {
      getBreakpointSize.mockImplementation(() => 'large');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });

    it('should render a Layout when huge', () => {
      getBreakpointSize.mockImplementation(() => 'huge');

      const result = shallow(layout);
      expect(result).toMatchSnapshot();
    });
  });
});
