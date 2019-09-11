import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import myStyles from './../styles';

import t from 'tcomb-form-native'; // 0.6.9

import Entities from 'html-entities';

const entities = new Entities.AllHtmlEntities();

const Form = t.form.Form;

const options = {
    fields: {
        titulo: {
            label: entities.decode('T&iacute;tulo'),
            // stylesheet: myStyles,
        },
        descripcion: {
            label: entities.decode('Descripci&oacute;n'),
        },
        fase: {
            placeholder: entities.decode('Seleccione opci&oacute;n'),
        },
    },
    i18n: {
        optional: ' (opcional)',
        required: '',
        add: 'Agregar',   // add button
        remove: '?',  // remove button
        up: '?',      // move up button
        down: '?'     // move down button
    },
};

const newForm = t.struct({
    nombre: t.String,
    titulo: t.String,              // a required string
    descripcion: t.maybe(t.String),  // an optional string
    fase: t.enums({
        M: 'Masculino',
        F: 'Femenino'
    }, entities.decode('G&eacute;nero')),               // a required number
    prueba: t.Boolean        // a boolean
});

export default class FormConfigurations extends Component {
    onPress() {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
        }
    }

    render() {
        return (
            <View style={myStyles.containerForm}>
                {/* display */}
                <Form
                    ref="form"
                    type={newForm}
                    options={options}
                />
                <TouchableHighlight style={myStyles.buttonForm} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={myStyles.buttonFormText}>Guardar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}