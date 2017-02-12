import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header,Button, CardSection,Spinner } from './components/common/index';
import LoginForm from './components/LoginForm';


class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
        apiKey: 'AIzaSyDA-ls4lOKcdks1v1wMSZABzEDsTx5AZkQ',
        authDomain: 'authentication-4b637.firebaseapp.com',
        databaseURL: 'https://authentication-4b637.firebaseio.com',
        storageBucket: 'authentication-4b637.appspot.com',
        messagingSenderId: '112566065962'
    });
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ loggedIn: true });
        } else {
            this.setState({ loggedIn: false });            
        }
    });
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
             return (
                <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}> 
                    Log Out
                    </Button>
                </CardSection>
             );
            case false:
             return <LoginForm />;
            default:
             return (
                <CardSection>
                    <Spinner size='large' />
                </CardSection>                 
             ); 
        }

    }

    render() {
        return ( 
            <View>
            <Header headerText="Authentication" /> 
            {this.renderContent()}
            </View>       
        );
    }
}

export default App;
