import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddItem from "./AddItem";
import ItemList from "./ItemList";

export default function ShoppingList() {
    const [items, setItems] = useState([]);

    const addItem = (newItem) => {
        // newItem.id = Math.random().toString();
        // console.log('Adding item:', newItem);
        setItems((currentItems) => [...currentItems, newItem]);
    };

    const deleteItem = (id) => {
        setItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    const updateItem = (id, quantity) => { 
        setItems(currentItems => {
            return currentItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity };
                }
                return item;
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Antonio's Shopping List</Text>
            <AddItem onAddItem={addItem} />
            <ItemList items={items} onDeleteItem={deleteItem} onUpdateItem={updateItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        textAlign: "center",
    },
})