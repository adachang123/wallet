import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
  ADD_WALLET,
  DELETE_WALLET,
  ADD_MONEY,
  UPDATE_BALANCE,
} from '../action/ActionType'
import { updateBalance } from '../action/Actions';
import { handleActions } from 'redux-actions';

const { fromJS } = Immutable;

export const DefaultState = Immutable.fromJS({
    wallets: Immutable.Map(),
    balance: 0
  });

export const walletApp = handleActions({
    [ADD_WALLET]: (state, {payload}) => {
        const wallets = state.get('wallets').set(payload.id, fromJS({
            id: payload.id,
            address: payload.address,
            balance: payload.balance
        }));
        state = state.mergeDeep({wallets: wallets});
        return state;
    },
    [DELETE_WALLET]: (state, {payload}) => {
        let target = state.get('wallets').get(payload.id);
        if (target) {
            const wallets = state.get('wallets').delete(payload.id);
            state = state.set('wallets', wallets);
            state = walletApp(state, updateBalance());
        }

        return state;
    },
    [ADD_MONEY]: (state, {payload}) => {
        let target = state.get('wallets').get(payload.id);
        if (target) {
            target = target.update('balance', (v)=>v+10);
            const wallets = state.get('wallets').set(payload.id, target);
            state = state.set('wallets', wallets);
            state = walletApp(state, updateBalance());
        }

        return state;
    },
    [UPDATE_BALANCE]: (state) => {
        const wallets = state.get('wallets');
        const balance = wallets.reduce(
            (sum, wallet) => sum + wallet.get('balance'),
            0);

        return state.set('balance', balance);
    }
}, DefaultState);

const rootReducer = combineReducers({
    walletApp
});

export default rootReducer;
