import React from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../action/Actions';
import styles from '../index.less';

class ActionBar extends React.Component {
    tmpFunc() {
        alert('Miao');
    }
    render() {
        const {dispatch} = this.props;
        return (
            <div className={ styles['action-bar'] }>
                <button onClick={() => dispatch(addWallet())}>Create Wallet</button>
                <button onClick={this.tmpFunc}>Import Wallet</button>
            </div>
        )
    };
}

export default connect()(ActionBar);
