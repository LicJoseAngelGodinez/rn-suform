import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
  Image,
  ScrollView,
  Animated,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { NavigationEvents } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';
import Entities from 'html-entities';
import myStyles from './../styles';

const entities = new Entities.AllHtmlEntities();

const Header_Maximum_Height = 200;

const Header_Minimum_Height = vh(10);

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.AnimatedHeaderValue = new Animated.Value(0);
    this.state = {
      credentials: 2,
      username: null,
      tkSesion: null,
      msg: null
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.loadCredentials = this.loadCredentials.bind(this);
  }

  async loadCredentials() {
    //debugger;
    if (this.props.navigation.getParam('credentials') != 2) {
      this.setState({ credentials: this.props.navigation.getParam('credentials') });
      this.setState({ username: this.props.navigation.getParam('userName') });
      this.setState({ tkSesion: this.props.navigation.getParam('tkSesion') });
      this.setValue('userData', JSON.stringify(this.props.navigation.getParam('credentials')));

      try {
        let msg = this.props.navigation.getParam('msg');
        this.setState.msg = msg;
        if (msg) {
          Alert.alert(msg.title, entities.decode(msg.msg));
        }
      } catch (error) {

      }

    }
  }

  removeUserData() {
    this.removeValue('userData');
    this.removeValue('dataTokens');
    this.setState(Object.assign(...Object.keys(this.state).map(k => ({ [k]: null }))))
    this.props.navigation.navigate('Login');
  }

  setValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch(e) {
      // save error
    }  
    console.log('Done SET VALUE.')
  }

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      // remove error
    }  
    console.log('Done REMOVE.')
  }


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    Alert.alert(
      'Cerrar',
      entities.decode('Va a cerrar sesi&oacute;n, desea continuar?'),
      [
        {
          text: 'Cancelar',
          onPress: () => {
            console.log(entities.decode('Cancel&oacute;'));
          },
          style: 'cancel',
        },
        {
          text: 'Cerrar',
          onPress: () => {
            console.log('OK presionado');
            this.removeUserData();            
            return true;
          }
        },
      ],
      { cancelable: true },
    );
    return true;

  }

  toast = (buttonId) => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared! Toco: ' + buttonId,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }

  render() {
    const { username, credentials, tkSesion } = this.state;
debugger;
    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: ['#7b1fa2', '#FFF'],

        extrapolate: 'clamp'
      });

    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: [Header_Maximum_Height, Header_Minimum_Height],

        extrapolate: 'clamp'
      });

    if (username != null) {
      return (
        <View style={myStyles.MainContainer}>
          <Animated.View
            style={[
              myStyles.Header,
              {
                height: AnimateHeaderHeight,
                backgroundColor: AnimateHeaderBackgroundColor,
              },
            ]}>

            <Text style={myStyles.HeaderInsideText}>
              {entities.decode(username)}
            </Text>
          </Animated.View>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
            ])}>
            {/* Put all your Component here inside the ScrollView */}
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate({
                        routeName: 'Wait',
                        params: {
                            goTo: 1,
                            tkSesion: tkSesion
                        }})}>
              <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/key.png')}
                  style={myStyles.ImageIconStyle}
                />
                <Text style={myStyles.TextStyle}> {entities.decode('Tokens de integraci&oacute;n')} </Text>
              </View>              
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.toast('Formularios')}>

            <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/clipboard.png')}
                  style={myStyles.ImageIconStyle}
                />

                <Text style={myStyles.TextStyle}> Formularios </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.toast('Nuevo formulario')}>

            <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/add.png')}
                  style={myStyles.ImageIconStyle}
                />

                <Text style={myStyles.TextStyle}> Nuevo formulario </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>

            <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/application.png')}
                  style={myStyles.ImageIconStyle}
                />

                <Text style={myStyles.TextStyle}> {entities.decode('Configuraci&oacute;n')} </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
            <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/customer-support.png')}
                  style={myStyles.ImageIconStyle}
                />

                <Text style={myStyles.TextStyle}> Soporte </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
            <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/global-network.png')}
                  style={myStyles.ImageIconStyle}
                />

                <Text style={myStyles.TextStyle}> Opciones extra 1 </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
            <View style={myStyles.mainMenuButton}>
                <Image
                  source={require('./../assets/images/global-network.png')}
                  style={myStyles.ImageIconStyle}
                />

                <Text style={myStyles.TextStyle}> Opciones extra 2 </Text>
                </View>
            </TouchableOpacity>
          </ScrollView>

        </View>
      );
    } else {
      return (
        <View style={myStyles.container}>
          <NavigationEvents
                onDidFocus={() => this.loadCredentials(this.props)}
                />
        </View>
      );
    }
  }
}

