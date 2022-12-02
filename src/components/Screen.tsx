import React, {useCallback, useMemo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { User } from '../services/api';

interface ScreenProps extends React.PropsWithChildren {
    topInset?: boolean;
    bottomInset?: boolean;
};

export const Screen: React.FC<ScreenProps> = ({ children, bottomInset, topInset }) => {
    const {top, bottom} = useSafeAreaInsets()
    const screenStyle = useMemo(() => ({
        paddingTop: topInset ? top : 0,
        paddingBottom: bottomInset ? bottom : 0
    }), [top, bottom, bottomInset, topInset])

    return (
        <View style={[styles.screen, screenStyle]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        width: '100%'
    }
})
