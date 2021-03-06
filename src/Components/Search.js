import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import RecyclerViewList, { DataSource } from 'react-native-recyclerview-list';
import { HeaderTextInput } from './Common';
import * as Act from '../Actions';
import { backgroundColor, backgroundColorLight } from '../Values/colors';
import ListItem from '../Components/ListItem';

class Search extends PureComponent {
    state = {
        dataSource: [],
        text: ''
    };

    componentWillMount() {
        this.props.fetchSongs();
        this.setState({ dataSource: this.props.songs });
    }

    SearchFilterFunction(text) {
        const newData = this.props.songs.filter((item) => {
            const itemData = item.songName.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text
        });
    }

    render() {
        const dataSource = new DataSource(this.state.dataSource, (item, index) => item.songID);
        //console.log(dataSource);
        return (
            <View style={{ flex: 1 }} >
                <StatusBar
                    backgroundColor={backgroundColorLight} 
                    barstyle='dark-content'
                />
                <HeaderTextInput 
                    value={this.state.text} 
                    placeholder='Search...' 
                    onChangeText={(text) => {
                            this.SearchFilterFunction(text);
                        }
                    }                
                />
                <RecyclerViewList
                    style={{ flex: 1 }}
                    dataSource={dataSource}
                    renderItem={({ item, index }) => <ListItem item={item} />}
                />
            </View>
        );
    }
}

const styles = {
    
};

const mapStateToProps = (state) => {
    return {
        songs: state.songs,
        selectedSong: state.selectedSong,
        recentlyAdded: state.recentlyAdded,
        playlistList: state.playlistList,
        selectedPlaylistID: state.selectedPlaylistID,
        selectedPlaylistSongList: state.selectedPlaylistSongList,
        albumList: state.albumList,
        selectedAlbumID: state.selectedAlbumID,
        selectedAlbumSongList: state.selectedAlbumSongList,
        artistList: state.artistList,
        selectedArtistID: state.selectedArtistID,
        selectedArtistSongList: state.selectedArtistSongList,
    };
};

export default connect(mapStateToProps, Act)(Search);
