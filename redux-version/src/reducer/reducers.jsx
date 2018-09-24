import { combineReducers } from 'redux';

function getWalletIdx(state, id) {
    return state.wallets.findIndex(wallet => wallet.id === id);
}

function sumBalance(state) {
    return state.wallets.reduce(
        (sum, wallet) => sum + wallet.balance,
        0);
}

function walletApp(state={wallets:[], balance: 0}, action) {
    let idx;
    switch (action.type) {
        case 'ADD_WALLET':
            state.wallets = state.wallets.concat({
                id: action.id,
                address: action.address,
                balance: action.balance
            });
            return Object.assign({}, state)
        case 'DELETE_WALLET':
            idx = getIdxByWalletId(action.id);

            if (idx !== -1) {
                state.wallets.splice(idx, 1);
                state.balance = sumBalance();
            }     
            return state;
        case 'ADD_MONEY':
            idx = getIdxByWalletId(action.id);
            if (idx !== -1) {
                state.wallets[idx].balance += 10;
                state.balance = sumBalance();
            }
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    walletApp
});

export default rootReducer;
