import React, { useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useAddUserMutation, useFetchUsersQuery } from "../services/api";
import { Screen } from "../components/Screen";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { CardList } from "../components/CardList";

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const ListScreen: React.FC<Props> = ({ navigation }) => {
    const {data, isLoading, refetch} = useFetchUsersQuery();
    const onPress = useCallback((id: number) => navigation.navigate('Details', {id}),[])
    const [addUserMutation] = useAddUserMutation()
    const addUser = useCallback(() => {
        Alert.prompt('Create User', 'Enter Avatar Url', addUserMutation)
    }, [addUserMutation])

    return (
        <Screen bottomInset>
            <CardList
                data={data?.users ?? []}
                refreshing={isLoading}
                onRefresh={refetch}
                onPress={onPress}
            />
            <TouchableOpacity onPress={addUser} style={styles.button}>
                <Text style={styles.buttonTitle}>Add user</Text>
            </TouchableOpacity>
        </Screen>
    )
}

const styles = StyleSheet.create({
    button: {
        positio: 'absolute',
        backgroundColor: 'blue',
        width: '50%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 8
    },
    buttonTitle: {
        color: 'white'
    }
})