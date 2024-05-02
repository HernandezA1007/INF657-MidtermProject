import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'; // TextInput
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'; // 

export default function ListItem({ item, onDeleteItem, onUpdateItem }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [isAcquired, setIsAcquired] = useState(item.status === "acquired");

    useEffect(() => {
        setIsAcquired(item.status === "acquired");
    }, [item.status]);


    const handleIncrease = () => {
        const newQuantity = parseInt(quantity) + 1;
        setQuantity(newQuantity.toString());
        onUpdateItem(item.id, newQuantity.toString());
    };

    const handleDecrease = () => {
        const newQuantity = Math.max(0, parseInt(quantity) - 1);
        setQuantity(newQuantity.toString());
        onUpdateItem(item.id, newQuantity.toString());
    };

    const markAsAcquired = () => {
        onUpdateItem(item.id, item.quantity, "acquired");
        setIsAcquired(true);
    };

    const rightSwipeActions = () => {
        return (
            <Pressable onPress={() => onDeleteItem(item.id)} style={styles.rightAction}>
                <MaterialIcons name="delete" size={32} color="#fff" />
            </Pressable>
        );
    };

    const leftSwipeActions = () => {
        return (
            <View style={styles.leftAction}>
                <MaterialIcons name="check" size={32} color="#fff" />
            </View>
        );
    };

    return (
        // <View style={styles.cardContainer}>
        //     <View style={styles.itemDetails}>
        //         <Text style={styles.title}>{item.title}</Text>
        //         <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        //     </View>
        //     <View style={styles.actions}>
        //         <Pressable onPress={() => onUpdateItem(item.id, parseInt(item.quantity) + 1)}>
        //             <MaterialIcons name="add-circle-outline" size={24} color="blue" />
        //         </Pressable>
        //         <Pressable onPress={() => onUpdateItem(item.id, Math.max(0, parseInt(item.quantity) - 1))}>
        //             <MaterialIcons name="remove-circle-outline" size={24} color="blue" />
        //         </Pressable>
        //         <Pressable onPress={() => onDeleteItem(item.id)}>
        //             <MaterialIcons name="delete" size={24} color="red" />
        //         </Pressable>
        //     </View>
        // </View>

        <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable
                renderRightActions={rightSwipeActions}
                renderLeftActions={leftSwipeActions}
                // onSwipeableLeftOpen={() => onUpdateItem(item.id, "acquired")} // deprecated?
                onSwipeableOpen={markAsAcquired}
                friction={2}  
                leftThreshold={30}  
                rightThreshold={30} 
                onSwipeableLeftOpen={() => {
                    markAsAcquired();
                    swipeableRow.close();  
                }}
                onSwipeableRightOpen={() => {
                    swipeableRow.close();  
                }}
                ref={(ref) => swipeableRow = ref}
            >
                {/* <View style={[styles.cardContainer, isAcquired ? styles.acquired : null]}> */}
                <View style={[styles.cardContainer, isAcquired ? styles.acquired : {}]}>
                    <View style={styles.itemDetails}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.quantity}>Quantity: {quantity}</Text> 
                    </View>
                    <View style={styles.actions}>
                        <Pressable onPress={handleIncrease}>
                            <MaterialIcons name="add-circle-outline" size={24} color="blue" />
                        </Pressable>
                        <Pressable onPress={handleDecrease}>
                            <MaterialIcons name="remove-circle-outline" size={24} color="blue" />
                        </Pressable>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        padding: 12,
        marginVertical: 5,
        marginHorizontal: 10, 
        width: '95%',
    },
    itemDetails: {
        flex: 3, 
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
    },
    actions: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-around', // between
        // alignItems: 'center',
        // minWidth: 120, // 100
        // maxWidth: 150,
        width: 100,
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    leftAction: {
        backgroundColor: 'green',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
    acquired: {
        backgroundColor: '#e0ffe0',
    },
});