'use strict';

import * as React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import * as FastClick from 'fastclick';

/**
 * Apply ES6 shim
 */
import 'es6-shim';

/**
 * Get application container
 */
const container = document.getElementById('application-container');

/**
 * Attach fastclick
 */
FastClick.attach(container);

/**
 * Run react application
 */
import {routes} from './routes';
const application = <Router history={browserHistory} routes={routes} />;
render(application, container);
