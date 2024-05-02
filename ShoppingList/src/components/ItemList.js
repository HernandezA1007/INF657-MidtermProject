import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import ListItem from './ListItem';

export default function ItemList({ items, onDeleteItem, onUpdateItem }) {
    const renderItem = ({ item }) => (
        <ListItem item={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem}/>
    );

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: '100%',
        // paddingHorizontal: 5,
        // alignItems: 'center',
    },
});