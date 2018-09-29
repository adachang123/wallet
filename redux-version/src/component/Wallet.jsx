import React from 'react';
import { connect } from 'react-redux';
import { deleteWallet, addMoney } from '../action/Actions';
import styles from '../index.less';

class Wallet extends React.Component {
    render() {
        const {dispatch, id, address, balance} = this.props;
        return (
            <div className={ styles.wallet }>
                <div className="info">
                    id: {id} <br />
                    address: {address} <br/>
                    balance: {balance} MIAO
                </div>
                <div className="btns">
                    <button
                        className="delete-btn"
                        onClick={() => dispatch(deleteWallet(id))}>
                    Delete
                    </button>
                    <button
                        className="add-money-btn"
                        onClick={() => dispatch(addMoney(id))}>
                    Add some money
                    </button>
                </div>
            </div>
        )
    };
}

const selectWallet = (state, props) => {
    const wallet = state.walletApp.wallets.get(props.id);
    return {
        id: wallet.get('id'),
        address: wallet.get('address'),
        balance: wallet.get('balance')
    }
}

export default connect(selectWallet)(Wallet);
