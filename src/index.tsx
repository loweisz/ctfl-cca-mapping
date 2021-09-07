import React from 'react';
import { render } from 'react-dom';

import {init} from '@contentful/app-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-tokens/dist/css/index.css';
import './index.css';

import LocalhostWarning from './components/LocalhostWarning';
import {getComponentOfLocation} from "./locationMapping";

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  // You can remove this if block before deploying your app
  const root = document.getElementById('root');
  render(<LocalhostWarning />, root);
} else {
  init((sdk) => {
    const Component: any = getComponentOfLocation(sdk)
    const root = document.getElementById('root');
    render(<Component sdk={sdk} />, root);
  });
}
