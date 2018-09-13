import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            wallets: [{
                id: 1,
                address: 'xx123',
                balance: 500
            }, {
                id: 2,
                address: 'xx456',
                balance: 10
            }]
        };
    }
   render() {
      return (
        <div>
            <Header></Header>
            <ActionBar></ActionBar>
            <WalletContainer wallets={this.state.wallets}></WalletContainer>
        </div>
      );
   }
}

export default App;

class Header extends React.Component {
    render() {
        return (
            <div className="page-header">
                Test Wallet
            </div>
        );
    }
}

class ActionBar extends React.Component {
    render() {
        return (
            <div className="action-bar">
                <button>Create Wallet</button>
                <button>Import Wallet</button>
            </div>
        )
    };
}

class WalletContainer extends React.Component {
    render() {
        return (
            <div className="wallet-container">
                {this.props.wallets.map(wallet => 
                    <Wallet key={wallet.id} {...wallet}></Wallet>
                )}
            </div>
        )
    }
}

class Wallet extends React.Component {
    render() {
        return (
            <div className="wallet">
                address: {this.props.address} <br/>
                balance: {this.props.balance}
            </div>
        )
    };
}