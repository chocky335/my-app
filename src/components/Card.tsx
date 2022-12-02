import React, {useCallback, useMemo} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import { User } from '../services/api';

interface CardProps extends User {
    separated: boolean;
    onPress: (id: number) => void 
};

export const Card = ({
    firstName,
    age,
    id,
    image,
    onPress,
    separated,
}: CardProps) => {
    const source = useMemo(() => ({ uri: image }), [image])
    const onPressCard = useCallback(() => onPress(id), [id, onPress]);
    const title = useMemo(() => `${firstName}, ${age}`, [age, firstName])
    const touchableStyle = useMemo(() => ({
        marginRight: separated ? 8 : 0,
        marginLeft: separated ? 0 : 8,
    }), [separated])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.touchable, touchableStyle]} onPress={onPressCard}>
                <Image source={source} resizeMode={'cover'} style={styles.image} />
                <Text>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: Dimensions.get('window').width / 2 - 24,
        height: Dimensions.get('window').width / 2 - 24,
        backgroundColor: 'gray'
    },
})