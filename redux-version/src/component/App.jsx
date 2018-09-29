import React from 'react';
import { connect } from 'react-redux';
import ActionBar from './actionBar';
import Wallet from './wallet';
import styles from '../index.less';

class App extends React.Component {
    render() {
        const { dispatch, wallets, balance } = this.props
        return (
            <div>
                <Header balance={balance}></Header>
                <ActionBar />
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

class WalletContainer extends React.Component {
    render() {
        const {wallets} = this.props;
        return (
            <div className="wallet-container">
                {[...wallets.values()].map(wallet =>
                    <Wallet
                        key={wallet.get('id')}
                        id={wallet.get('id')}>
                    </Wallet>
                )}
            </div>
        )
    }
}
