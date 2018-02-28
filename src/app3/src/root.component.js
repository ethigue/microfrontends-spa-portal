import React from 'react';
import {Provider, connect} from 'react-redux';
import Counter from './counter';
import reactLogo from '../assets/react-logo.png'


export default class Root extends React.Component {

    state = {store: null, globalStoreEventDistributor: null};

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    setStore(store) {
        this.setState({... this.state, store });
    }

    setGlobalStoreEventDistributor(globalStoreEventDistributor) {
        this.setState({... this.state, globalStoreEventDistributor });
    }

    render() {

        let ret = <app3-root></app3-root>;

        if (this.state.store && this.state.globalStoreEventDistributor) {
            ret =
                <Provider store={this.state.store}>
                    <div style={{marginTop: 100}}>
                        <img src={reactLogo} style={{width: 100}}/> <br />
                        This was rendered by App3, which is written in React.
                        <Counter globalStoreEventDistributor={this.state.globalStoreEventDistributor}/>
                    </div>
                </Provider>
        }

        return ret;
    }
}
