import React from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../action/Actions';
import Wallet from './wallet';
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
        const {wallets} = this.props;
        return (
            <div className="wallet-container">
                {[...wallets.values()].map(wallet =>
                    <Wallet
                        key={wallet.get('id')}
                        {...wallet.toJS()}>
                    </Wallet>
                )}
            </div>
        )
    }
}
