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

import AsyncStorage from '@react-native-community/async-storage';
import Entities from 'html-entities';
import myStyles from './../styles';

const entities = new Entities.AllHtmlEntities();

const Header_Maximum_Height = 200;

const Header_Minimum_Height = vh(10);

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.AnimatedHeaderValue = new Animated.Value(0);

    let credentials = 2;
    let userName = null;
    let msg = null;

    if (props.navigation.getParam('credentials') != 2) {
        credentials = props.navigation.getParam('credentials');
        userName = props.navigation.getParam('userName');
        this.setValue('userData', JSON.stringify(credentials));

        try {
            msg = props.navigation.getParam('msg');
        } catch (error) {
            
        }
    }

    this.state = {
        credentials: credentials,
        username: userName,
        tkSesion: credentials.tkSesion,
        msg: msg
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    if ( msg ) {
        Alert.alert(msg.title, entities.decode(msg.msg));
    }
  }

  async loadCredentials() {
    try {
      const credentials = await AsyncStorage.getItem('userData');
      console.log({credentials: credentials});
      this.setState({ credentials: JSON.parse(credentials) });
    }
    catch (error) {
      // Manage error handling
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
          <Text>Has entrado!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },

  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS == 'ios' ? 20 : 0,
  },

  HeaderInsideText: {
    color: '#fff',
    fontSize: RFValue(25),
    textAlign: 'center',
  },

  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
  },

  containerButtonCard: {
    height: vh(10),
    margin: 5
  },

  imageButtonCard: {
    width: '100%',
    height: '100%',
    marginBottom: 5,
  },

  buttonIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },

  mainMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#7b1fa2',
    height: 100,
    borderRadius: 5,
    margin: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 3, // Android   
  },

  ImageIconStyle: {
    padding: 20,
    margin: 15,
    height: 40,
    width: 40,
    resizeMode: 'stretch',

  },

  TextStyle: {

    fontSize: vmax(2.5),
    color: "#7b1fa2",
    marginBottom: 4,
    marginRight: 20,

  },
});


