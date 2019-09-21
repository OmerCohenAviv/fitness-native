import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

const textButton = ({onPress, children}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};


export default textButton;