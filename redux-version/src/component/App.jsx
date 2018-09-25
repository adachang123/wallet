import React from 'react';
import { connect } from 'react-redux';
import { addWallet, deleteWallet, addMoney } from '../action/Actions.js';
import styles from '../index.less';

class App extends React.Component {
    render() {
        const { dispatch, wallets, balance } = this.props
        return (
            <div>
                <Header balance={balance}></Header>
                <ActionBar addWallet={()=>dispatch(addWallet())}></ActionBar>
                <WalletContainer
                    wallets={wallets}
                    deleteWallet={(id)=>dispatch(deleteWallet(id))}
                    addMoney={(id)=>dispatch(addMoney(id))}
                ></WalletContainer>
            </div>
        );
   }
}
function select(state) {
    return {
        wallets: state.walletApp.wallets,
        balance: state.walletApp.balance
    };
 }

export default connect(select)(App);

class Header extends React.Component {
    render() {
        return (
            <div className={ styles['page-header'] }>
                <h2>Miao Wallet</h2>
                <div className="balance">Balance: {this.props.balance} MIAO</div>
            </div>
        );
    }
}

class ActionBar extends React.Component {
    tmpFunc() {
        alert('Miao');
    }
    render() {
        return (
            <div className={ styles['action-bar'] }>
                <button onClick={this.props.addWallet}>Create Wallet</button>
                <button onClick={this.tmpFunc}>Import Wallet</button>
            </div>
        )
    };
}

class WalletContainer extends React.Component {
    render() {
        return (
            <div className="wallet-container">
                {[...wallets.values()].map(wallet =>
                    <Wallet
                        key={wallet.id}
                        deleteWallet={deleteWallet}
                        addMoney={addMoney} {...wallet}>
                    </Wallet>
                )}
            </div>
        )
    }
}

class Wallet extends React.Component {
    render() {
        const {id, address, balance, deleteWallet, addMoney} = this.props;
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
                        onClick={() => deleteWallet(id)}>
                    Delete
                    </button>
                    <button
                        className="add-money-btn"
                        onClick={() => addMoney(id)}>
                    Add some money
                    </button>
                </div>           
            </div>
        )
    };
}
