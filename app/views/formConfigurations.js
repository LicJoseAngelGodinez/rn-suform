import React, { Component } from 'react';

import {
    Alert,
    BackHandler,
} from 'react-native';

import { 
    ThemeProvider, 
    Button, 
    Input, 
    Divider, 
    Text,
    Header,
} from 'react-native-elements';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import Entities from 'html-entities';

import AsyncStorage from '@react-native-community/async-storage';

const entities = new Entities.AllHtmlEntities();

const theme = {
    Button: {
        containerStyle: {
            padding: 10,
        },
        buttonStyle: {
            backgroundColor: '#7b1fa2',
            elevation: 4,
            borderRadius: 30,
        },
        titleStyle: {
            color: 'white',
        },
    },
    Input: {
        labelStyle: {
            paddingTop: 5,
            color: '#7b1fa2',
        },
    },
    Text: {
        style: {
            paddingHorizontal: 10,
            fontSize: vmax(2.5),
        },
    }
};

export default class FormConfigurations extends Component {

    constructor(props) {

        super(props);

        this.state = {
            token: '',
        };
        this.loadToken();
        this.backToMenu = this.backToMenu.bind(this);
    }

    async loadToken() {

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
                            }
                        })
                        return true;
                    }
                },
            ],
            { cancelable: true },
        );
        return true;

    }

    datosForm() {
        console.log('datosForm');
    }



    render() {
        return (
            <ThemeProvider theme={theme}>
                <Divider style={{ backgroundColor: '#7b1fa2', marginBottom: 10, padding: 5 }} />
                <Input
                    label='Nombre'
                    placeholder='Nombre del formulario'
                    errorStyle={{ color: 'red' }}
                    // errorMessage={entities.decode('Ingrese nombre v&aacute;lido')}
                />
                <Input
                    label={entities.decode('T&iacute;tulo')}
                    placeholder={entities.decode('T&iacute;tulo del formulario')}
                    errorStyle={{ color: 'red' }}
                    // errorMessage={entities.decode('Ingrese nombre v&aacute;lido')}
                />
                <Input
                    label={entities.decode('Descripci&oacute;n')}
                    placeholder={entities.decode('Formulario para evento de...')}
                    errorStyle={{ color: 'red' }}
                    // errorMessage={entities.decode('Ingrese nombre v&aacute;lido')}
                />
                <Divider style={{ backgroundColor: '#7b1fa2', marginVertical: 10, padding: 5 }} />
                <Text>Identifica los contactos en SalesUp!</Text>
                <Input
                    label={entities.decode('Descripci&oacute;n')}
                    placeholder={entities.decode('Formulario para evento de...')}
                    errorStyle={{ color: 'red' }}
                    // errorMessage={entities.decode('Ingrese nombre v&aacute;lido')}
                />
                <Button title="Hey!"
                    onclick={() => this.datosForm()}
                />
            </ThemeProvider>
        );
    }
}


