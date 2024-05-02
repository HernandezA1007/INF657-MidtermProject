import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native'; // Button deprecated

export default function AddItem({ onAddItem }) {
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleQuantityChange = (text) => {
        setQuantity(text);
    };

    const handleSubmit = () => {
        if (!title || !quantity) {
            alert('Please fill in all fields');
            return;
        }
        const newItem = { title, quantity, id: Math.random().toString() };
        // console.log(newItem);
        // onAddItem({ title, quantity });
        onAddItem(newItem);
        setTitle('');
        setQuantity('');
    };

    return (
        <View>
            <TextInput
                placeholder="Item Title"
                value={title}
                onChangeText={handleTitleChange}
                style={styles.input}
            />
            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={handleQuantityChange}
                style={styles.input}
            />
            {/* <Button title="Add Item" onPress={handleSubmit} /> */}
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Item</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
