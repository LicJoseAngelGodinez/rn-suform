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

import { Picker } from '@react-native-community/picker';

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
        },
    }
};

export default class FormConfigurations extends Component {

    constructor(props) {

        super(props);

        let token = null;

        if (this.props.navigation.getParam('data')) {
            
            token = this.props.navigation.getParam('data');

        }

        this.state = {
            token: token,
            etiquetas: '',
            asignar: '',
            origen: '',
        };
        this.backToMenu = this.backToMenu.bind(this);
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

    datosForm = () => {

        const { token, etiquetas, origen, asignar } = this.state;

        console.log({
            datosForm: token,
            etiquetas: etiquetas,
            origen: origen,
            asignar: asignar,
        });
        Alert.alert('Datos', `Token: ${token}, etiquetas: ${etiquetas}, origen: ${origen}, asignar: ${asignar}`);
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
                <Text style={[], {fontSize: vmax(2.5)}}>Identifica los contactos en SalesUp!</Text>
                <Input
                    label={entities.decode('Descripci&oacute;n')}
                    placeholder={entities.decode('Formulario para evento de...')}
                    errorStyle={{ color: 'red' }}
                // errorMessage={entities.decode('Ingrese nombre v&aacute;lido')}
                />

                <Text style={[], { fontSize: vmax(2), paddingTop: 10, color: '#7b1fa2', fontWeight: 'bold' }}>Etiqueta(s)</Text>
                <Picker
                    selectedValue={this.state.etiquetas}
                    style={{ width: vw(98), marginHorizontal: 5,}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ etiquetas: itemValue })
                    }>
                    <Picker.Item label="( ... Selecciona una etiqueta ... )" value="" />
                    <Picker.Item label="prueba" value="prueba01" />
                    <Picker.Item label="prueba Etiqueta" value="pe" />
                </Picker>

                <Text style={[], { fontSize: vmax(2), paddingTop: 10, color: '#7b1fa2', fontWeight: 'bold' }}>Origen</Text>
                <Picker
                    selectedValue={this.state.origen}
                    style={{ width: vw(98), marginHorizontal: 5,}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ origen: itemValue })
                    }>
                    <Picker.Item label="( ... Seleccione un origen ... )" value="" />
                    <Picker.Item label="origen 1" value="O1" />
                    <Picker.Item label="Otro origen" value="jsO1" />
                </Picker>

                <Text style={[], { fontSize: vmax(2), paddingTop: 10, color: '#7b1fa2', fontWeight: 'bold' }}>Asignar a usuario</Text>
                <Picker
                    selectedValue={this.state.asignar}
                    style={{ width: vw(98), marginHorizontal: 5,}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ asignar: itemValue })
                    }>
                    <Picker.Item label="( ... Ninguno ... )" value="" />
                    <Picker.Item label="Galeana" value="gali" />
                    <Picker.Item label="Voldemort" value="youknowwho" />
                </Picker>

                <Button title="Hey!"
                    onPress={() => this.datosForm()}
                />
            </ThemeProvider>
        );
    }
}


