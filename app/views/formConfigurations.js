import React, { Component } from 'react';

import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert,
    Keyboard,
    ToastAndroid,
    ActivityIndicator,
    BackHandler,
    Button,
} from 'react-native';

import myStyles from './../styles';

import Entities from 'html-entities';

import AsyncStorage from '@react-native-community/async-storage';

const entities = new Entities.AllHtmlEntities();

export default class LoginView extends Component {

    constructor(props) {

        super(props);

        this.state = {
            token: '',
        };
        this.loadToken();
        this.backToMenu = this.backToMenu.bind(this);
    }

    async loadToken () {

        if (this.props.navigation.getParam('data')) {

            let token = this.props.navigation.getParam('data');
      
            this.setState({ token: token });
      
          }

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToMenu);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToMenu)
    }

    backToMenu() {
        Alert.alert(
            'Nuevo formulario',
            entities.decode('Desea descartar los cambios? El formulario no se guardar&aacute;'),
            [
                {
                    text: 'Continuar',
                    style: 'cancel',
                },
                {
                    text: 'Descartar',
                    onPress: () => {
                        this.props.navigation.navigate({
                            routeName: 'Wait',
                            params: {
                                goTo: null,
                            }})
                        return true;
                    }
                },
            ],
            { cancelable: true },
        );
        return true;

    }

    

    render() {
        return (
            <View style={myStyles.containerForm}>

                <Text>{entities.decode('Entr&oacute; a configuraci&oacute;n')}</Text>

            </View>
        );
    }
}


