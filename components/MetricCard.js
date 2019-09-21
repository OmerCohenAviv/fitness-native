import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers'
import DateHeader from './DateHeader';
import { gray } from '../utils/colors'


const MetricCard = ({ date, metrics }) => {
    return (
        <View>
            {date && <DateHeader date={date} />}
            {Object.keys(metrics).map((metric) => {
                const { getIcon, displayName, unit } = getMetricMetaInfo(metric)

                return (
                    <View style={styles.metric} key={metric}>
                        {getIcon()}
                        <View>
                            <Text style={{ fontSize: 20 }}>
                                {displayName}
                            </Text>
                            <Text style={{ fontSize: 20, color: gray }}>
                                {metrics[metric]}  {unit}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row',
        marginTop: 12
    }
})

export default MetricCard;