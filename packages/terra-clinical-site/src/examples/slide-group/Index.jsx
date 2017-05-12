/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-slide-group/docs/README.md';
import { version } from 'terra-clinical-slide-group/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import SlideGroupSrc from '!raw-loader!terra-clinical-slide-group/src/SlideGroup.jsx';

// Example Files
import SlideGroupDemo from './SlideGroupDemo.jsx';

const SlideGroupExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-slideGroup" src={SlideGroupSrc} />
    <h2 id="slideGroup">SlideGroup Demo</h2>
    <br />
    <SlideGroupDemo />
    <br />
    <h2 id="slideGroup">Animation Disabled</h2>
    <br />
    <SlideGroupDemo animationIsDisabled />
  </div>
);

export default SlideGroupExamples;