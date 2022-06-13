import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import login from './login';
import home from './home';
import cadastro from './cadastro';
import lista from './lista';
class App extends Component {
    render() {
        return (
            <Router>
                <Stack key={login} hideNavBar>
                    <Scene key="login" component={login} title="Login" />
                    <Scene key="inicio" component={home} title="Home" />
                    <Scene key="cadastro" component={cadastro} title="Cadastro" />
                    <Scene key="lista" component={lista} title="Lista" />
                </Stack>
            </Router>
        );
    }
}
export default App;