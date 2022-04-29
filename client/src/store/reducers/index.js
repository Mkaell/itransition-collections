import { combineReducers } from 'redux';

import users from './users';
import auth from './auth';
import collections from './collections'

export const reducers = combineReducers({ auth, users, collections });