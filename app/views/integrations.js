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
  TouchableHighlight,
  ToastAndroid,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { StackActions, } from 'react-navigation';

import Entities from 'html-entities';
import myStyles from './../styles';
import AsyncStorage from '@react-native-community/async-storage';

const entities = new Entities.AllHtmlEntities();

const Header_Maximum_Height = 200;

const Header_Minimum_Height = vh(10);

export default class Integrations extends React.Component {

  constructor(props) {
    super(props);
    this.AnimatedHeaderValue = new Animated.Value(0);

    let dataTokens = null;
    let tkSesion = null;
    let tkUsuario = null;
    // let userData = null;

    if (props.navigation.getParam('dataTokens')) {
      dataTokens = props.navigation.getParam('dataTokens');
      dataTokens = (typeof dataTokens == 'string') ? JSON.parse(dataTokens) : dataTokens;
      tkSesion = props.navigation.getParam('tkSesion');
      // userData = await AsyncStorage.getItem('userData');
      // userData = JSON.parse(userData);
      // tkUsuario = userData.tkUsuario;
    }

    props.navigation.state.params.goTo = null;

    this.state = {
      tkSesion: tkSesion,
      dataTokens: dataTokens,
      tkUsuario: tkUsuario,
      isLoading: false,
      selectedToken: null,
    };
    //this.loadCredentials();
    this.backToHome = this.backToHome.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    // const { params = {} } = navigation.state; //delete this
     return {
         headerRight: (
           <TouchableOpacity 
           style={{
             paddingEnd: 10
           }}
           onPress={() => navigation.state.params.handleSave('Prueba', 'Token: nada')}>
             <Text>Guardar</Text>
           </TouchableOpacity>
         )  // add navigation.state
     };
   };


  async loadCredentials() {
    try {
      try {
        const dataTokens = await AsyncStorage.getItem('dataTokens');
        this.setState({ dataTokens: JSON.parse(dataTokens) });

      } catch (error) {

      }
      try {
        const selectedToken = await AsyncStorage.getItem('tokenSelected');
        this.setState({ selectedToken: selectedToken });

      } catch (error) {

      }
      if (dataTokens == null) {
        this.loadTokens();
      }
    }
    catch (error) {
      // Manage error handling
    }
  }

  alertExample (titulo, mensaje) {
    Alert.alert(titulo, mensaje);
  }

  ShowHideActivityIndicator = () => {

    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
    }
    else {
      this.setState({ isLoading: true });
    }
  }

  loadTokens = () => {
    this.ShowHideActivityIndicator();
    const { tkSesion } = this.state;

    let urlIntegracion = 'https://api.salesup.com/integraciones?pagina=0';
    let formData = new FormData();

    formData.append("pagina", 0);

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
          this.setState({ dataTokens: dataTemp });
          this.ShowHideActivityIndicator();

        } else {
          this.ShowHideActivityIndicator();
          Alert.alert('Acceso', entities.decode('El usuario y/o contrase&ntilde;a no es correcto.'));
          return false;
        }
      })
      .catch((error) => {
        Alert.alert(entities.decode('Error'), entities.decode('Al parecer hay un problema, revisa tu acceso a datos o la conexi&oacute;n inal&aacute;mbrica.'));
      });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backToHome);
    this.props.navigation.setParams({ handleSave: this.alertExample });
  }

  backToHome() {
    this.props.navigation.navigate({
      routeName: 'Wait',
      params: {
        goTo: null
      }
    });
    return true;

  }

  selectToken = (buttonId) => {

    this.setState({ selectedToken: buttonId });
    AsyncStorage.setItem('tokenSelected', buttonId);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {

    const { dataTokens } = this.state;

    if (dataTokens && dataTokens.length > 0) {

      return (
        <View style={myStyles.MainContainer}>

          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: 0 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.loadTokens}
              />
            }
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
            ])}>
            {

              dataTokens.map(element => {
                return (
                  <TouchableOpacity key={element.tkIntegracion} style={this.state.selectedToken == element.tkIntegracion ? myStyles.tokenElementSelected : myStyles.tokenElement} activeOpacity={0.5} onPress={() => this.selectToken(element.tkIntegracion)}>

                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <Image
                          source={require('./../assets/images/login.png')}
                          style={myStyles.ImageIconStyleInegrations}
                        />
                      </View>
                      <View style={{ paddingTop: 3, flex: 1, paddingRight: 10 }}>
                        <Text style={{ textAlign: 'right', fontSize: 18 }}>{element.config.nombre ? element.config.nombre : '- Sin nombre -'}</Text>
                        <Text style={{ textAlign: 'right', fontSize: 12, fontStyle: 'italic' }}>{element.tkIntegracion}</Text>
                      </View>
                    </View>

                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>

        </View>
      );
    } else {
      return (
        <View style={myStyles.container}>
          <ActivityIndicator size="large" color="#7b1fa2" style={{ padding: 20 }} />
        </View>
      );
    }
  }
}