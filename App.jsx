import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.idx_count = 0;
        this.state = {
            wallets:[],
            balance: 0
        };
    }
    
    render() {
      return (
        <div>
            <Header balance={this.state.balance}></Header>
            <ActionBar addWallet={this.addWallet.bind(this)}></ActionBar>
            <WalletContainer wallets={this.state.wallets}
                delete={this.deleteWallet.bind(this)}
                addMoney={this.addMoney.bind(this)}
            ></WalletContainer>
        </div>
      );
   }

   addWallet() {
        let new_wallet = {
            id: this.idx_count++,
            address: new Date().valueOf(),
            balance: 0
        };
        this.state.wallets.push(new_wallet);
        this.setState(this.state);
    }

    getIdxByWalletId(id) {
        for (var idx in this.state.wallets) {
            if (this.state.wallets[idx].id == id) {
                return idx;
            }
        }
        return -1;
    }

    deleteWallet(id) {
        let idx = this.getIdxByWalletId(id);

        if (idx != -1) {
            this.state.wallets.splice(idx,1);
            this.updateBalance();
            this.setState(this.state);
        } 
    }

    updateBalance() {
        let balance = 0;
        for (let i in this.state.wallets) {
            balance += this.state.wallets[i].balance;
        }
        this.state.balance = balance;
    }
    addMoney(id) {
        let idx = this.getIdxByWalletId(id);

        if (idx != -1) {
            this.state.wallets[idx].balance += 10;
            this.updateBalance();
            this.setState(this.state);
        }
    }
}

export default App;

class Header extends React.Component {
    render() {
        return (
            <div className="page-header">
                <h2>Miao Wallet</h2>
                <div className="balance">Balance: {this.props.balance} MIAO</div>
            </div>
        );
    }
}

class ActionBar extends React.Component {
    tmpFun() {
        alert('Miao');
    }
    render() {
        return (
            <div className="action-bar">
                <button onClick={this.props.addWallet}>Create Wallet</button>
                <button onClick={this.tmpFun}>Import Wallet</button>
            </div>
        )
    };
}

class WalletContainer extends React.Component {
    render() {
        return (
            <div className="wallet-container">
                {this.props.wallets.map(wallet => 
                    <Wallet key={wallet.id} 
                        delete={this.props.delete}
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
            <div className="wallet">
                <div className="info">
                    id: {this.props.id} <br />
                    address: {this.props.address} <br/>
                    balance: {this.props.balance} MIAO
                </div>
                <div className="btns">
                    <button className="delete-btn"
                        onClick={() => this.props.delete(this.props.id)}>Delete
                    </button>
                    <button className="add-money-btn"
                        onClick={() => this.props.addMoney(this.props.id)}>Add some money
                    </button>
                </div>           
            </div>
        )
    };
}