import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import LibraryList from '../Components/LibraryList';
import Search from '../Components/Search';
import ListView from '../Components/ListView';
import GridView from '../Components/GridView';
import PlayerScreen from '../Components/PlayerScreen';
import { backgroundColor } from '../Values/colors';

const RouterComponent = () => {
    return (
        <Router {...sceneConfig}>
            <Stack hideNavBar>
                <Scene key='libraryList' component={LibraryList} initial />
                <Scene key='search' component={Search} />     
                <Scene key='allSongs' component={ListView} />
                <Scene key='albumList' component={GridView} />     
                <Scene key='artistList' component={GridView} />     
                <Scene key='playlistList' component={GridView} />     
                <Scene key='recentlyAdded' component={ListView} />     
                <Scene key='playlistSongList' component={ListView} />     
                <Scene key='albumSongList' component={ListView} />     
                <Scene key='artistSongList' component={ListView} />
                <Scene key='playerScreen' component={PlayerScreen} />
            </Stack>
        </Router>
    );
};

const sceneConfig = {
    cardStyle: {
      backgroundColor
    }
};

export default RouterComponent;
