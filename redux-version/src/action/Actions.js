import {ADD_WALLET, DELETE_WALLET, ADD_MONEY} from './ActionType'

let idGenerator = (() => {
    let i = 0;
    return {
        next: () => {
            return ++i;
        }
    }
})();

export const addWallet = () => ({
    type: ADD_WALLET,
    id: idGenerator.next(),
    address: new Date().valueOf(),
    balance: 0
});

export const deleteWallet = id => ({
    type: DELETE_WALLET,
    id
});

export const addMoney = id => ({
    type: ADD_MONEY,
    id
});