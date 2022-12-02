import React, { useCallback } from "react";
import { User } from "../services/api";
import { FlatList, FlatListProps, ListRenderItem, StyleSheet, View } from "react-native";
import { Card } from "./Card";

interface CardListProps {
    data: User[];
    refreshing: boolean;
    onRefresh: () => void;
    onPress: (id: number) => void
};

const keyExtractor: FlatListProps<User>['keyExtractor'] = item =>
  `${item.id}`;

export const CardList: React.FC<CardListProps> = ({ data, onPress, ...listProps }) => {
    const dataSize = data.length
    const renderCard: ListRenderItem<User> = useCallback(
        ({item, index}) => (
            <Card
                {...item}
                separated={index % 2 === 0}
                isLast={index === dataSize - 1}
                onPress={onPress}
            />
        ),
        [dataSize, onPress],
    );

    return (
            <FlatList<User>
                data={data}
                renderItem={renderCard}
                keyExtractor={keyExtractor}
                numColumns={2}
                horizontal={false}
                contentContainerStyle={styles.listContainer}
                style={styles.list}
                {...listProps}
            />
    )
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        flex: 1
    },
    listContainer: {
        padding: 16,
        paddingBottom: 0,
    }
})