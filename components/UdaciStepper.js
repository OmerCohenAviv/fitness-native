import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { white, gray, purple} from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iosBtn: {
        justifyContent: 'center',
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 25,
        paddingRight: 25
    },
    androidBtn: {
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
        color: white,
        backgroundColor: 'blue',
        borderRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,

    },
    valueAndUnit: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 85, 
    },
});

const udaciStepper = ({ unit, value, onDecrement, onIncrement }) => {
    return (
        <View style={[styles.container]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onDecrement} style={Platform.ios === 'ios' ? styles.iosBtn : styles.androidBtn}>
                    <FontAwesome name='minus' size={30} style={{ color: white }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement} style={Platform.ios === 'ios' ? styles.iosBtn : styles.androidBtn}>
                    <FontAwesome name='plus' size={30} style={{ color: white }} />
                </TouchableOpacity>
            </View>
            <View style={[styles.valueAndUnit]}>
                <Text style={{fontSize: 24, textAlign: 'center', color: 'black'}}>{value}</Text>
                <Text style={{fontSize: 24, textAlign: 'center', color: gray}}>{unit}</Text>
            </View>
        </View>
    );
};


export default udaciStepper