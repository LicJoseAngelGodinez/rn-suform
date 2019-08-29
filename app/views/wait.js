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
            credentials: null,
        }
        this.redirectViews(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async redirectViews(props) {

        if (!props.navigation.getParam('goTo')) {
            try {
                let credentials = await AsyncStorage.getItem('userData');
                if (credentials && credentials != 2) {

                    let dataTemp = JSON.parse(credentials);
                    let userName = `${dataTemp.nombre} ${dataTemp.apellidos}`;

                    this.props.navigation.navigate({
                        routeName: 'Main',
                        params: {
                            credentials: dataTemp,
                            userName: userName
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
                    
                    let tkSesion = props.navigation.getParam('tkSesion');
                    try {
                        const dataTokens = await AsyncStorage.getItem('dataTokens');
                        if ( dataTokens ) {

                            this.props.navigation.navigate({
                                routeName: 'Integrations',
                                params: {
                                    dataTokens: dataTokens,
                                    tkSesion: tkSesion
                                }
                            })
                        } else {
                            this.loadTokens(tkSesion);
                        }
                        
                      } catch (error) {
                          this.loadTokens(tkSesion);                        
                      }

                    break;

                default:
                    this.props.navigation.navigate('Login');
            }
        }
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );

        const { navigation } = this.props;
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: 0 });
        });
    }

    handleBackButtonClick() {

        Alert.alert(
            'Cancelar',
            entities.decode('Desea salir de la aplicaci&oacute;n?'),
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Salir',
                    onPress: () => {
                        BackHandler.exitApp();
                        return true;
                    }
                },
            ],
            {
                cancelable: true
            },
        );
        return true;
    }

    async loadTokens(tkSesion) {

        let urlIntegracion = 'https://api.salesup.com/integraciones?pagina=0';

        let dataHeader = {
            method: 'GET',
            headers: {
                "token": tkSesion
            }
        };

        fetch(urlIntegracion, dataHeader)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    let dataTemp = responseJson.filter(function (item) {
                        return item.tipoIntegracion == 7 || item.tipoIntegracion == 8;
                    });

                    AsyncStorage.setItem('dataTokens', JSON.stringify(dataTemp));

                    this.props.navigation.navigate({
                        routeName: 'Integrations',
                        params: {
                            dataTokens: dataTemp,
                            tkSesion: tkSesion
                        }
                    })                    

                } else {

                    this.backToHome('Integraciones', 'Al parecer la cuenta no cuenta con ning&uacute;n token configurado, entra a tu cuenta y crea uno para continuar.');
                    return false;
                }
            })
            .catch((error) => {
                this.backToHome('Integraciones', 'Favor de revisar tu acceso a datos o la conexi&oacute;n inal&aacute;mbrica.');
            });
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