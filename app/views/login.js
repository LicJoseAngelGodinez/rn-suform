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
            user: '',
            email: '',
            password: '',
            isLoading: false,
            Isbuttonenable: false,
        };
        this.exitAppAction = this.exitAppAction.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.exitAppAction);
      }
    
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.exitAppAction)
      }
    
      exitAppAction() {
        Alert.alert(
          'Salir',
          entities.decode('Desea salir de la aplicaci&oacute;n?'),
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Salir',
              onPress: () => {   
                  BackHandler.exitApp();         
                return true;
              }
            },
          ],
          { cancelable: true },
        );
        return true;
    
      }

    toast(msg) {
        ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    }

    ShowHideActivityIndicator = () => {

        if (this.state.isLoading == true) {
            this.setState({ isLoading: false });
            this.setState({ Isbuttonenable: false });
        }
        else {
            this.setState({ isLoading: true });
            this.setState({ Isbuttonenable: true });
        }

    }

    onClickListener = (viewId) => {
        Keyboard.dismiss();
        Alert.alert("Alerta", "Has presionado: " + viewId);
    }

    loadLoginData = (accounOption) => {

        switch ( accounOption ) {
            case 1:
                this.login({
                    user: 'salesupnewton@gmail.com',
                    password: 'Salesup2016!'
                });
                break;

            case 2:                
                this.login({
                    user: 'angel@prueba.com',
                    password: 'Salesup2016!'
                });
                break;

            case 3:
                this.login({
                    user: 'salesupsocrates@gmail.com',
                    password: 'Salesup2016!'
                });
                break;
        }
    }

    login = (obj) => {

        let user = '';
        let password = '';
        if ( !obj ) {

            const { user, password } = this.state;

        } else {

            user = ( obj.user );
            password = ( obj.password );

        }

        this.ShowHideActivityIndicator();

        Keyboard.dismiss();

        let loginURL = 'https://api.salesup.com/login';
        let formData = new FormData();

        formData.append('usuario', user);
        formData.append('contrasenia', password);

        let dataHeader = {
            method: 'POST',
            body: formData
        };

        fetch(loginURL, dataHeader)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson[0].tkSesion) {
                    let userTemp = responseJson[0];
                    userTemp = userTemp.nombre + ' ' + userTemp.apellidos;
                    this.ShowHideActivityIndicator();

                    return this.props.navigation.navigate({
                        routeName:'Main', 
                        params: {
                            credentials     : responseJson[0],
                            userName        : userTemp,
                            tkSesion        : responseJson[0].tkSesion
                        }});
                } else {
                    this.ShowHideActivityIndicator();
                    Alert.alert('Acceso', entities.decode('El usuario y/o contrase&ntilde;a no es correcto.'));

                    return false;
                }
            })
            .catch((error) => {
                this.ShowHideActivityIndicator();
                Alert.alert(entities.decode('Conexi&oacute;n'), entities.decode('Al parecer hay un problema, revisa tu acceso a datos o la conexi&oacute;n inal&aacute;mbrica.'));
            });
    }

    render() {
        return (
            <View style={myStyles.container}>

                {
                    this.state.isLoading ? <ActivityIndicator size="large" color="#7b1fa2" style={{ padding: 20 }} /> : null
                }

                <View style={{ width: '70%' }}>
                    <Image source={require('./../assets/images/letter-logo.jpg')} style={{ width: '100%', height: 100 }} />
                </View>
                <View style={myStyles.inputContainer}>
                    <Image style={myStyles.inputIcon} source={require('./../assets/images/mail.png')} />
                    <TextInput style={myStyles.inputs}
                        placeholder={entities.decode('Token de Integraci&oacute;n')}
                        keyboardType="default"
                        autoCapitalize='none'
                        onChangeText={(user) => this.setState({ user })}
                    />
                </View>

                {/* <View style={myStyles.inputContainer}>
                    <Image style={myStyles.inputIcon} source={require('./../assets/images/lock.png')} />
                    <TextInput style={myStyles.inputs}
                        placeholder={entities.decode('Contrase&ntilde;a')}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View> */}

                <TouchableHighlight
                    disabled={this.state.Isbuttonenable}
                    style={!this.state.Isbuttonenable ? [myStyles.buttonContainer, myStyles.loginButton] : [myStyles.buttonContainer, myStyles.loginButtonDisabled]}
                    onPress={() => this.login()}>
                    <Text style={{ color: '#FFFFFF' }}>Entrar</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    disabled={this.state.Isbuttonenable}
                    style={myStyles.buttonContainer}
                    onPress={() => this.toast('recuperar_contrasenia')}>
                    <Text style={!this.state.Isbuttonenable ? myStyles.loginText : myStyles.loginTextDisabled}>Solicitar Token</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    disabled={this.state.Isbuttonenable}
                    style={myStyles.buttonContainer}
                    onPress={() => this.toast('registro')}>
                    <Text style={!this.state.Isbuttonenable ? myStyles.loginText : myStyles.loginTextDisabled}>Registro</Text>
                </TouchableHighlight>

                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 3}}>
                        <Button
                            onPress={() => this.loadLoginData(1)}
                            title="Newton"
                            color="#7b1fa2"
                            disabled={this.state.Isbuttonenable}
                            accessibilityLabel=" XXXX "
                        />
                    </View>
                    <View style={{padding: 3}}>
                        <Button
                            onPress={() => this.loadLoginData(2)}
                            title="Angel"
                            color="#7b1fa2"
                            disabled={this.state.Isbuttonenable}
                            accessibilityLabel=" XXXX "
                        />
                    </View>
                    <View style={{padding: 3}}>
                        <Button
                            onPress={() => this.loadLoginData(3)}
                            title="Socrates"
                            color="#7b1fa2"
                            disabled={this.state.Isbuttonenable}
                            accessibilityLabel=" XXXX "
                        />
                    </View>
                </View>

            </View>
        );
    }
}


