import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import trackerReducer from './slices/tracker';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
};

const rootReducer = combineReducers({
    tracker: trackerReducer,
});

export { rootPersistConfig, rootReducer };
