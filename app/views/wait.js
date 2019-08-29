import React from  'react';
import { 
    Image, 
    View, 
    StyleSheet, 
    Alert, 
    BackHandler,
    ActivityIndicator,
} from 'react-native';

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
        this.loadCredentials();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async loadCredentials() {
        try {
            let credentials = await AsyncStorage.getItem('userData');
            if ( credentials && credentials != 2 ) {

                let dataTemp = JSON.parse(credentials);
                let userName = `${dataTemp.nombre} ${dataTemp.apellidos}`;

                this.props.navigation.navigate({
                    routeName: 'Main',
                    params: {
                        credentials: dataTemp,
                        userName: userName
                    }});
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (error) {
            this.props.navigation.navigate('Login');
        }
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
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

    render () {
        return (
            <View 
                style={myStyles.container}
            >
                <ActivityIndicator 
                size="large"
                color="#7b1fa2"
                style={{ padding: 20 }}/>
                <View style={{ width: 80, height: 80 }}>
                    <Image source={require('../assets/images/white-simple-logo.jpg')} style={{ width: '100%', height: '100%' }}/>
                </View>
            </View>
        );
    }


}