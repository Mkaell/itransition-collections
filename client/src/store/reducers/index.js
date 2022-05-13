import { combineReducers } from 'redux';

import users from './users';
import auth from './auth';
import collections from './collections'
import items from './items'
import search from './search'

export const reducers = combineReducers({ auth, users, collections, items, search });