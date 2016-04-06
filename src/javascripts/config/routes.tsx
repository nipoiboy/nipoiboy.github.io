'use strict';

import * as React from 'react';
import {Route, IndexRoute} from 'react-router';

import {IndexController} from '../components/controllers/IndexController';

export const routes = (
  <Route path="/">
    <IndexRoute component={IndexController} />
  </Route>
);
