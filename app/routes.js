import { 
    createStackNavigator,
    createAppContainer, 
} from 'react-navigation';

import Entities from 'html-entities';

import Wait from './views/wait';
import Login from './views/login';
import Main from './views/main';

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
});

const App = createAppContainer(Router);

export default App;