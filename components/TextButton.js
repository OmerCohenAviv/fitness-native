import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { purple } from '../utils/colors';

const textButton = ({onPress, children}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.reset}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};

styles = StyleSheet.create({
    reset: {
        textAlign: 'center', 
        color: purple
    }
})

export default textButton;