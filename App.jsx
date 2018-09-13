import React from 'react';
import styles from './index.less';

/* preset 2015 don't support generator QAQ
let idGenerator = (function*() {
    let i = 0;
    while (true) {
        yield i++;
    }
})();
*/

let idGenerator = (() => {
    let i = 0;
    return {
        next: () => {
            return ++i;
        }
    }
})();

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            wallets: [],
            balance: 0
        };
    }
    
    render() {
      return (
        <div>
            <Header balance={this.state.balance}></Header>
            <ActionBar addWallet={this.addWallet.bind(this)}></ActionBar>
            <WalletContainer
                wallets={this.state.wallets}
                deleteWallet={this.deleteWallet.bind(this)}
                addMoney={this.addMoney.bind(this)}
            ></WalletContainer>
        </div>
      );
   }

   addWallet() {
        this.state.wallets.push({
            id: idGenerator.next(),
            address: new Date().valueOf(),
            balance: 0
        });
        this.setState(this.state);
    }

    getIdxByWalletId(id) {
        return this.state.wallets.findIndex(wallet => wallet.id === id)
    }

    deleteWallet(id) {
        let idx = this.getIdxByWalletId(id);

        // early return
        if (idx === -1) {
            return;
        }
        this.state.wallets.splice(idx, 1);
        this.state.balance = this.sumBalance();
        this.setState(this.state);
    }

    sumBalance() {
        return this.state.wallets.reduce(
            (sum, wallet) => sum + wallet.balance,
            0);
    }

    addMoney(id) {
        let idx = this.getIdxByWalletId(id);

        // early return
        if (idx === -1) {
            return;
        }
        this.state.wallets[idx].balance += 10;
        this.state.balance += 10;
        this.setState(this.state);
    }
}

export default App;

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
                {this.props.wallets.map(wallet => 
                    <Wallet
                        key={wallet.id}
                        deleteWallet={this.props.deleteWallet}
                        addMoney={this.props.addMoney} {...wallet}>
                    </Wallet>
                )}
            </div>
        )
    }
}

class Wallet extends React.Component {
    render() {
        return (
            <div className={ styles.wallet }>
                <div className="info">
                    id: {this.props.id} <br />
                    address: {this.props.address} <br/>
                    balance: {this.props.balance} MIAO
                </div>
                <div className="btns">
                    <button
                        className="delete-btn"
                        onClick={() => this.props.deleteWallet(this.props.id)}>
                    Delete
                    </button>
                    <button
                        className="add-money-btn"
                        onClick={() => this.props.addMoney(this.props.id)}>
                    Add some money
                    </button>
                </div>           
            </div>
        )
    };
}
