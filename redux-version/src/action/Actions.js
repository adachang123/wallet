import {
  ADD_WALLET,
  DELETE_WALLET,
  ADD_MONEY,
  UPDATE_BALANCE,
} from './ActionType'
import { createActions } from 'redux-actions';

let idGenerator = (() => {
    let i = 0;
    return {
        next: () => {
            return ++i;
        }
    }
})();

export default createActions({
    [ADD_WALLET]: () => ({
        id: idGenerator.next(),
        address: new Date().valueOf(),
        balance: 0
    }),
    [DELETE_WALLET]: (id) => ({
        id
    }),
    [ADD_MONEY]: (id) => ({
        id
    }),
    [UPDATE_BALANCE]: () => ({})
});
