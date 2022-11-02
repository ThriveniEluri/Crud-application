import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootreducer from './root-reducer';

const midleware = [reduxThunk];
if(process.env.NODE_ENV === 'development'){
    midleware.push(logger)
}
const store =createStore(rootreducer,applyMiddleware(...midleware));
export default store;