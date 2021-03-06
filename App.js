import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import Reducers from './src/Reducers';
// import { permissionCheck } from './react_native_fetch_music_filesNativeModule';
import MyApp from './src/Components/App';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, Reducers);
let store = createStore(persistedReducer);
let persistor = persistStore(store);
const appStore = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));

class App extends Component {
    async componentWillMount() {
        initialisePlayer();
        await permissionCheck();
    }

    render() {
        return (
            <Provider store={appStore}>
                <PersistGate loading={null} persistor={persistor}>
                    <MyApp />
                </PersistGate>
            </Provider>
        );
    }
}

const initialisePlayer = async () => {
    await TrackPlayer.setupPlayer({})
        .then(() => {
            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SEEK_TO,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                ],
                playIcon: require('./src/Drawables/icons/play_icon.png'),
                pauseIcon: require('./src/Drawables/icons/pause_icon.png'),
                previousIcon: require('./src/Drawables/icons/prev_icon.png'),
                nextIcon: require('./src/Drawables/icons/next_icon.png'),
                icon: require('./src/Drawables/icons/amplay.png')
            });
        }
    );
};

const permissionCheck = async () => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.show('Access to storage denied!', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.warn(err);
      }
};

export default App;
