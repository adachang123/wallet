import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {ADD_WALLET, DELETE_WALLET, ADD_MONEY} from '../action/ActionType'
import { handleActions } from 'redux-actions';

const { fromJS } = Immutable;

export const DefaultState = Immutable.fromJS({
    wallets: Immutable.Map(),
    balance: 0
  });

function sumBalance(wallets) {
    return wallets.reduce(
        (sum, wallet) => sum + wallet.get('balance'),
        0);
}

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
            const balance = sumBalance(wallets);

            state = state.set('wallets', wallets);
            state = state.set('balance', balance);
        }

        return state;
    },
    [ADD_MONEY]: (state, {payload}) => {
        let target = state.get('wallets').get(payload.id);
        if (target) {
            target = target.update('balance', (v)=>v+10);
            const wallets = state.get('wallets').set(payload.id, target);
            const balance = sumBalance(wallets);

            state = state.set('wallets', wallets);
            state = state.set('balance', balance);
        }

        return state;
    }
}, DefaultState);

const rootReducer = combineReducers({
    walletApp
});

export default rootReducer;