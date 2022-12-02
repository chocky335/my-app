import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Screen } from "../components/Screen";
import { useFetchUsersQuery, useRemoveUserMutation } from "../services/api";
import { RootStackParamList } from "../types";
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const {data, isLoading} = useFetchUsersQuery();
    const [removeUserMutation] = useRemoveUserMutation()
    const user = data?.users.find(({ id }) => id === route.params?.id)
    const source = useMemo(() => ({ uri: user?.image }), [user?.image])
    const userId = user?.id
    const removeUser = useCallback(() => {
        if (userId) {
            removeUserMutation(userId)
            navigation.pop()
        }
    }, [userId])
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => userId ? (
                <TouchableOpacity onPress={removeUser}>
                    <Ionicons name="close" size={20}  />
                </TouchableOpacity>
            ) : null
        })
    }, [userId])
    
    if (isLoading) {
        return (
            <Screen bottomInset>
                <ActivityIndicator />
            </Screen>
        )
    }
    if (!user) {
        return (
            <Screen bottomInset>
                <Text>User is not found</Text>
            </Screen>
        )
    }

    return (
        <Screen bottomInset>
            <Image source={source} resizeMode={'cover'} style={styles.image} />
            <Text>FirstName: {user.firstName}</Text>
            <Text>LastName: {user.lastName}</Text>
            <Text>Age: {user.age}</Text>
            <Text>Company: {user.address.postalCode}, {user.address.state}, {user.address.address}</Text>
        </Screen>
    );
};

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width / 2 - 24,
        height: Dimensions.get('window').width / 2 - 24,
    },
    title: {

    },
})