import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Alert,
    BackHandler,
    ActivityIndicator,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import Entities from 'html-entities';
import AsyncStorage from '@react-native-community/async-storage';

import myStyles from './../styles';

const entities = new Entities.AllHtmlEntities();

export default class Wait extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            usersData: null,
        }
        this.redirectViews(props);
        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async redirectViews(props) {

        if (!props.navigation.getParam('goTo')) {
            try {
                let userData = await AsyncStorage.getItem('userData');
                if (userData) {

                    this.props.navigation.navigate({
                        routeName: 'Main',
                        params: {
                            userData: userData,
                        }
                    });
                } else {
                    this.props.navigation.navigate('Login');
                }
            } catch (error) {
                this.props.navigation.navigate('Login');
            }
        } else {
            let goTo = props.navigation.getParam('goTo');
            switch (goTo) {
                
                case 1:
                    let token = props.navigation.getParam('token');
                    
                    this.getSessionToken(token);

                    break;

                case 2:
                    let configToken = props.navigation.getParam('token');
                    
                    this.getConfigurationData(configToken);

                    break;

                default:
                    this.props.navigation.navigate('Login');
            }
        }
    }

    // componentDidMount() {
    //     BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         this.handleBackButtonClick
    //     );

    //     const { navigation } = this.props;
    //     //Adding an event listner om focus
    //     //So whenever the screen will have focus it will set the state to zero
    //     this.focusListener = navigation.addListener('didFocus', () => {
    //         this.setState({ count: 0 });
    //     });
    // }

    // handleBackButtonClick() {

    //     Alert.alert(
    //         'Cancelar',
    //         entities.decode('Desea salir de la aplicaci&oacute;n?'),
    //         [
    //             {
    //                 text: 'Cancelar',
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Salir',
    //                 onPress: () => {
    //                     BackHandler.exitApp();
    //                     return true;
    //                 }
    //             },
    //         ],
    //         {
    //             cancelable: true
    //         },
    //     );
    //     return true;
    // }

    async getSessionToken(token) {

        let urlIntegracion = 'https://api.salesup.com/integraciones/sesion';

        let dataHeader = {
            method: 'POST',
            headers: {
                "token": token
            }
        };

        fetch(urlIntegracion, dataHeader)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {

                    let dataTemp = {
                        token           : token,
                        sessionToken    : responseJson[0].token
                    };

                    AsyncStorage.setItem('userData', JSON.stringify(dataTemp));

                    this.props.navigation.navigate({
                        routeName: 'Main',
                        params: {
                            userData: JSON.stringify(dataTemp)
                        }
                    })                    

                } else {

                    this.backToHome('Integraciones', entities.decode('Al parecer ha ocurrido un error con el token, aseg&uacute;rate de que es correcto.'));
                    return false;
                }
            })
            .catch((error) => {
                this.backToHome('Integraciones', 'Favor de revisar tu acceso a datos o la conexi&oacute;n inal&aacute;mbrica.');
            });
    }

    async getConfigurationData (sessionToken) {

        let credentials = '';

        if ( sessionToken ) {
        
            this.props.navigation.navigate({
                routeName: 'FormConfigurations',
                params: {
                    data: sessionToken,
                }
            });

        } else {

            credentials = await AsyncStorage.getItem('userData');
            credentials = JSON.parse(credentials);
            sessionToken = credentials.sessionToken;

            this.props.navigation.navigate({
                routeName: 'FormConfigurations',
                params: {
                    data: sessionToken,
                }
            }) 

        }
    }

    backToHome(title, msg) {
        let credentials = AsyncStorage.getItem('userData');
        credentials = JSON.parse(credentials);

        let userName = `${credentials.nombre} ${credentials.apellidos}`

        this.props.navigation.navigate({
            routeName: 'Main',
            params: {
                credentials: credentials,
                userName: userName,
                tkSesion: credentials.tkSesion,
                msg: {
                    title: title,
                    msg: msg
                }
            }
        })
    }

    render() {
        return (
            <View
                style={myStyles.container}
            >

<NavigationEvents
                onDidFocus={() => this.redirectViews(this.props)}
                />
                <ActivityIndicator
                    size="large"
                    color="#7b1fa2"
                    style={{ padding: 20 }} />
                <View style={{ width: 80, height: 80 }}>
                    <Image source={require('../assets/images/white-simple-logo.jpg')} style={{ width: '100%', height: '100%' }} />
                </View>
            </View>
        );
    }


}