import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

import Entities from 'html-entities';

const entities = new Entities.AllHtmlEntities();

const Form = t.form.Form;

const options = {
    fields: {
        titulo: {
            label: entities.decode('T&iacute;tulo')
        },
        descripcion: {
            label: entities.decode('Descripci&oacute;n'),
        },
    },
    i18n: {
        optional: ' (opcional)',
        required: '',
        add: 'Agregar',   // add button
        remove: '?',  // remove button
        up: '?',      // move up button
        down: '?'     // move down button
      }
};

const Person = t.struct({
    titulo: t.String,              // a required string
    descripcion: t.maybe(t.String),  // an optional string
    fase: t.Number,               // a required number
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
            <View style={styles.container}>
                {/* display */}
                <Form
                    ref="form"
                    type={Person}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});