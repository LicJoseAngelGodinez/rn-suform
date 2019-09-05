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
            tokenSesion: '',
            isLoading: false,
            Isbuttonenable: false,
        };
        this.exitAppAction = this.exitAppAction.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.exitAppAction);
    }

    componentWillUnmount() {
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

        switch (accounOption) {
            case 1:
                this.props.navigation.navigate({
                    routeName: 'Wait',
                    params: {
                        goTo: 1,
                        token: 'P0122CE87AA-1379-4F28-AA86-082D705BC884!'
                    }
                })
                break;

            case 2:
                this.props.navigation.navigate({
                    routeName: 'Wait',
                    params: {
                        goTo: 1,
                        token: 'P0165DD8D50-FDCB-4693-BF16-2A94DD1B43B3'
                    }
                })
                break;

            case 3:
                this.props.navigation.navigate({
                    routeName: 'Wait',
                    params: {
                        goTo: 1,
                        token: 'P012DA7A29C-FC41-44A3-925E-E46464339958'
                    }
                })
                break;
        }
    }

    login = (obj) => {

        let token = '';
        if (!obj) {

            const { token } = this.state;

        } else {

            token = (obj.token);

        }

        this.ShowHideActivityIndicator();

        Keyboard.dismiss();

        let loginURL = 'https://api.salesup.com/integraciones/sesion';

        let dataHeader = {
            method: 'POST',
            token: token
        };

        fetch(loginURL, dataHeader)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson[0].token) {
                    this.ShowHideActivityIndicator();

                    return this.props.navigation.navigate({
                        routeName: 'Wait',
                        params: {
                            goTo: 1,
                            token: token,
                            tokenSesion: responseJson[0].token
                        }
                    });
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
                    <Image style={myStyles.inputIcon} source={require('./../assets/images/key.png')} />
                    <TextInput style={myStyles.inputs}
                        placeholder={entities.decode('Token de Integraci&oacute;n')}
                        keyboardType="default"
                        autoCapitalize='none'
                        onChangeText={(token) => this.setState({ token })}
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
                    onPress={() => this.props.navigation.navigate({
                        routeName: 'Wait',
                        params: {
                            goTo: 1,
                            token: token
                        }
                    })
                    }>
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

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 3 }}>
                        <Button
                            onPress={() => this.loadLoginData(1)}
                            title={entities.decode('&Aacute;ngel')}
                            color="#7b1fa2"
                            disabled={this.state.Isbuttonenable}
                            accessibilityLabel=" XXXX "
                        />
                    </View>
                    <View style={{ padding: 3 }}>
                        <Button
                            onPress={() => this.loadLoginData(2)}
                            title="Newton"
                            color="#7b1fa2"
                            disabled={this.state.Isbuttonenable}
                            accessibilityLabel=" XXXX "
                        />
                    </View>
                    <View style={{ padding: 3 }}>
                        <Button
                            onPress={() => this.loadLoginData(3)}
                            title="Mayola"
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


