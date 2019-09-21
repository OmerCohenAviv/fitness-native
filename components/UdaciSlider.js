import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    valueAndUnit: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
    },
    slider: {
        flex: 1
    }
});

const udaciSlider = (props) => {
    const { step, max, value, onChange, unit } = props
    return (
        <View style={[styles.container]}>
            <Slider
                style={styles.slider}
                onValueChange={onChange}
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
            />
            <View style={[styles.valueAndUnit]}>
                <Text style={{ fontSize: 24, textAlign: 'center', color: 'black' }}>{value}</Text>
                <Text style={{ fontSize: 24, textAlign: 'center', color: gray }}>{unit}</Text>
            </View>
        </View>
    );
};



export default udaciSlider;