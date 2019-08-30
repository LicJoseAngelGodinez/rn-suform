
import {
    StyleSheet,
} from 'react-native';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
    // Main
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Login
    inputContainer: {
        borderColor: '#7b1fa2',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#7b1fa2",
    },
    loginButtonDisabled: {
        backgroundColor: "#CDCDCD",
    },
    loginText: {
        color: '#7b1fa2',
    },
    loginTextDisabled: {
        color: '#CDCDCD',
    },
    // Main
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
    //   Integraciones

    tokenElement: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#7b1fa2',
        height: 60,
        borderRadius: 3,
        margin: 4,
    },
    tokenElementSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e040fb',
        borderWidth: .5,
        borderColor: '#7b1fa2',
        height: 60,
        borderRadius: 3,
        margin: 4,
    },
    ImageIconStyleInegrations: {
        padding: 20,
        margin: 5,
        height: 40,
        width: 40,
        resizeMode : 'stretch',      
     },
});
