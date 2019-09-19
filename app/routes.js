import React from 'react'

import {
    Text,
    Alert,
    TouchableHighlight
} from 'react-native';

import { 
    createStackNavigator,
    createAppContainer, 
} from 'react-navigation';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import Entities from 'html-entities';


import myStyles from './styles';
import Wait from './views/wait';
import Login from './views/login';
import Main from './views/main';
import Integrations from './views/integrations';
import FormConfigurations from './views/formConfigurations';

const entities = new Entities.AllHtmlEntities();

const Router = createStackNavigator({    
    Wait: {
        screen: Wait,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    Integrations: {
        screen: Integrations,
        navigationOptions: {
            title: entities.decode('Tokens de Integraci&oacute;n'),
            headerLeft: null,
            // headerRight: (
            //     <TouchableHighlight
            //         style={{ 
            //             paddingRight: 10,
            //             fontSize: vmax(20),
            //         }}
            //         color="#7b1fa2"
            //     >
            //         <Text
            //             style={{ 
            //                 fontSize: vmax(2.5),
            //             }}
            //         >Guardar</Text>
            //     </TouchableHighlight>
            // ),
            headerTintColor: '#7b1fa2'
        }
    },
    FormConfigurations: {
        screen: FormConfigurations,
        navigationOptions: {
            title: 'Nuevo formulario',
            headerLeft: null,
            headerTintColor: '#7b1fa2',
        },
    },
});

const App = createAppContainer(Router);

export default App;