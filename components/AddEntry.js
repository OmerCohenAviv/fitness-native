import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { purple } from '../utils/colors';

SubmitBtn = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight: 40,
        marginLeft: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginRight: 30,
        marginLeft: 30,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        marginLeft: 30,
        marginRight: 30
    }
});

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    };
    incrementHandler = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);
        this.setState((prevState) => {
            const count = prevState[metric] + step;
            return {
                ...prevState,
                [metric]: count > max ? max : count
            }
        })
    };
    decrementHandler = (metric) => {
        this.setState((prevState) => {
            const count = prevState[metric] - getMetricMetaInfo(metric).step
            return {
                ...prevState,
                [metric]: count < 0 ? 0 : count
            }
        })
    };
    slider = (metric, value) => {
        this.setState({
            [metric]: value
        })
    };
    submit = () => {
        const key = timeToString();
        const entry = this.state;
        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }));
        this.props.dispatch(addEntry({
            [key]: entry
        }))
        submitEntry(key, entry)
    }
    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        removeEntry(key)
    }
    render() {
        if (this.props.arleadyLogged) {
            return (
                <View style={[styles.center]}>
                    <Ionicons name={Platform.OS === 'ios' ? ios-happy : 'md-happy' } size={100} />
                    <Text style={{padding: 10}}>You Arleady logged your information for this day.</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }

        let metricInfo = getMetricMetaInfo();
        metricInfo = Object.keys(metricInfo).map(key => {
            const value = this.state[key]
            const { ...rest } = metricInfo[key]
            return (
                getMetricMetaInfo(key).type === 'slider' ?
                    <View key={key} style={[styles.row]}>
                        {getMetricMetaInfo(key).getIcon()}
                        <UdaciSlider
                            {...rest}
                            onChange={(value) => this.slider(key, value)}
                            value={value} />
                    </View>
                    : <View key={key} style={[styles.row]}>
                        {getMetricMetaInfo(key).getIcon()}
                        <UdaciStepper
                            {...rest}
                            onIncrement={() => this.incrementHandler(key)}
                            onDecrement={() => this.decrementHandler(key)}
                            value={value} />
                    </View>
            );
        })
        return (
            <View style={[styles.container]}>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {metricInfo}
                <SubmitBtn onPress={this.submit} />
            </View>
        );
    };
};

const mapStateToProps = state => {
    const key = timeToString();
    return {
        arleadyLogged: state[key] && (typeof state[key].today === 'undefined')
    }
}

export default connect(mapStateToProps)(AddEntry);