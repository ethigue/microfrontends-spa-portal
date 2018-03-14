import React from 'react';
import {Provider, connect} from 'react-redux';
import Counter from './counter';
import reactLogo from '../assets/react-logo.png'
import css from "./app1.scss";

export default class Root extends React.Component {

    state = {store: null, globalStoreEventDistributor: null, eventsConstants: {}};

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    setStore(store) {
        this.setState({... this.state, store });
    }

    setGlobalStoreEventDistributor(globalStoreEventDistributor) {
        this.setState({... this.state, globalStoreEventDistributor });
    }

    setEventsConstants(eventsConstants) {
        this.setState({... this.state, eventsConstants });
    }

    render() {

        let ret = <app1-root></app1-root>;

        if (this.state.store && this.state.globalStoreEventDistributor) {
            ret =
                <Provider store={this.state.store}>
                    <div className="container">
                        <img src={reactLogo} style={{width: 100}}/> <br />
                        This was rendered by App1, which is written in React.
                        <Counter 
                            globalStoreEventDistributor={this.state.globalStoreEventDistributor}
                            eventsConstants={this.state.eventsConstants}
                        />
                    </div>
                </Provider>
        }

        return ret;
    }
}
