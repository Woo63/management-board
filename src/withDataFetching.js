import React from 'react';
//import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAM1t8uBr-XSu0uDtReuOj_B3RmRXsDWsk",
    authDomain: "management-board-3ec1f.firebaseapp.com",
    databaseURL: "https://management-board-3ec1f.firebaseio.com",
    storageBucket: "management-board-3ec1f.appspot.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const url = process.env.REACT_APP_DB_URL
export default function withDataFetching(WrappedComponent) {
    class WithDataFetching extends React.Component {
        constructor() {
            super();
            this.state = {
                data: [],
                loading: true,
                error: ''
            }
        }
        async componentDidMount() {
            try {
                // console.log(firebase)
                // console.log("database",firebase.database())
                const res = await fetch(`${url}/tickets.json`);
                const dataJSON = await res.json();
                if (dataJSON) {
                    this.setState({
                        data: Object.values(dataJSON),
                        loading: false
                    });
                }
            } catch(error) {
                this.setState({
                    loading: false,
                    error: error.message,
                });
            }
        }

        render() {
            const { data, loading, error } = this.state;
            return (
                <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            );
        }
    }
    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;
    return WithDataFetching;
}