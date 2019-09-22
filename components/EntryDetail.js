import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MetricCard from './MetricCard';
import { white } from '../utils/colors';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends Component {
    shouldComponentUpdate(nextProps) {
        console.log(nextProps)
        return nextProps.metrics !== null &&  !nextProps.metrics.today 
    };
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params;
        const year = entryId.slice(0, 4);
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)
        return {
            title: `${day}/${month}/${year}`
        };
    };
    reset = () => {
        const { remove, goBack, entryId } = this.props
        remove()
        goBack()
        removeEntry(entryId)
    };
    render() {
        const { metrics } = this.props
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={ this.reset} style={{ margin: 20 }}>
                    RESEST
                </TextButton>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { entryId } = navigation.state.params;

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { entryId } = navigation.state.params
    return {
        entryId,
        metrics: state[entryId]
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);

