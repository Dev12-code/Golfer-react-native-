/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./store/reducers";
import rootSaga from "./store/sagas";
import { createLogger } from "redux-logger";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('notification received : setBackgroundMessageHandler ', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    return <RabbitCard />;
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];
const logger = createLogger();

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

const RabbitCard = () => (
    <Provider store={store}>
        <PaperProvider>
            <App />
        </PaperProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => HeadlessCheck);
