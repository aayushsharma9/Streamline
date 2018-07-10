import React, { Component } from 'react';
import {
    View,
    Text,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { Input } from './Input';
import { CardSection } from './CardSection';
import { BorderlessButton } from './BorderlessButton';
import * as actions from '../../Actions';
import { onBackgroundColor } from '../../Values/colors';

class SingleInputModal extends Component {
    state = { playlistName: '', myVisibility: true };
    
    render() {
        return (
            <Modal
                visible={this.props.visible && this.state.myVisibility}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <CardSection>
                        <Input
                            label="Playlist Name"
                            placeholder="playlist..."
                            value={this.state.playlistName}
                            onChangeText={playlistName => this.setState({ playlistName })}
                        />
                    </CardSection>
                    <CardSection>
                        <BorderlessButton onPress={this.props.onDiscard}>Discard</BorderlessButton>
                        <BorderlessButton 
                            onPress={() => {
                                this.props.createNewPlaylist(this.state.playlistName);
                                this.setState({ myVisibility: false });
                            }}
                        >
                            Save
                        </BorderlessButton>
                    </CardSection>
                </View>
            </Modal>
        );
    }
}

const styles = {
    cardSelectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        color: onBackgroundColor
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export default connect(null, actions)(SingleInputModal);
