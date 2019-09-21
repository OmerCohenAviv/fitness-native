import React from 'react';
import { Text } from 'react-native';
import {purple} from '../utils/colors';

const dateHeader = ({ date }) => {
    return (
        <Text style={{color: purple, fontSize: 24, paddingTop: 20}}>
            {date}
        </Text>
    );
};


export default dateHeader; 