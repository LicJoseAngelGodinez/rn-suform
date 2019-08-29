import { 
    createStackNavigator,
    createAppContainer, 
} from 'react-navigation';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import Entities from 'html-entities';

import Wait from './views/wait';
import Login from './views/login';
import Main from './views/main';
import Integrations from './views/integrations';

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
            headerStyle: {
                backgroundColor: '#fff',
                paddingBottom: vh(3),
                marginBottom: vh(1),
            },
            headerTintColor: '#7b1fa2'
        }
    }
});

const App = createAppContainer(Router);

export default App;