/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-layout/docs/README.md';
import { version } from 'terra-clinical-layout/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import LayoutSrc from '!raw-loader!terra-clinical-layout/src/Layout.jsx';

// Example Files
import LayoutStandard from './LayoutStandard';

const NavigationExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-layout" src={LayoutSrc} />
    <h2 id="layout-standard">Layout Standard</h2>
    <LayoutStandard />
  </div>
);

export default NavigationExamples;
