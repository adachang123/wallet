import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {ADD_WALLET, DELETE_WALLET, ADD_MONEY} from '../action/ActionType'

const { fromJS } = Immutable;

function getIdxByWalletId(state, id) {
    return state.wallets.findIndex(wallet => wallet.id === id);
}

function sumBalance(state) {
    return state.wallets.reduce(
        (sum, wallet) => sum + wallet.balance,
        0);
}

function walletApp(state={wallets: Immutable.Map(), balance: 0}, action) {
    let idx;
    switch (action.type) {
        case ADD_WALLET:
            state.wallets = state.wallets.set(action.id, fromJS({
                id: action.id,
                address: action.address,
                balance: action.balance
            }));
            return Object.assign({}, state)
        case DELETE_WALLET:
            if (state.wallets.get(action.id)) {
                state.wallets = state.wallets.delete(action.id);
                state.balance = sumBalance(state);
            }

            return Object.assign({}, state);
        case ADD_MONEY:
            idx = getIdxByWalletId(state, action.id);
            if (idx !== -1) {
                state.wallets[idx].balance += 10;
                state.wallets = state.wallets.slice();
                state.balance = sumBalance(state);
            }
            return Object.assign({}, state);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    walletApp
});

export default rootReducer;
