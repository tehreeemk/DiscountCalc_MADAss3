import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect } from 'react';

export default function MainScreen({ navigation }) {
    const [ record, setRecord ] = useState([[]]);
    const [ price, setPrice ] = useState(10);
    const [ discount, setDiscount ] = useState();
    let finalPrice = (price - ((discount / 100) * price)).toFixed(2);
    let youSave = (price - finalPrice).toFixed(2);


    const priceHandler = (e) => {
        setPrice(e);
    }

    const discountHandler = (e) => {
        setDiscount(e);
    }

    const errorPriceMessage = () => {
        if(price < 0 ){
            return (<Text style={{color: 'red'}}>Price should be a positive number</Text>);
        }
    }

    const errorDiscountMessage = () => {
        if(discount > 100){
           return( <Text style={{color: 'red'}}>Discount can't be greater than 100</Text> );
        }
    }

    const saveButtonHandler = () => {
        
        setRecord(() => [...record, [price, discount]]);
            console.log(record);
    }

    const saveButtonRenderer = () => {
        if(price == record[record.length-1][0]){
            if (discount == record[record.length-1][1]){
                return(
                    <Button 
                        title="Save Record"
                        disabled
                        onPress={saveButtonHandler}
                    />
                );
            } else{
                return(
                    <Button 
                            color="coral"
                            title="Save Record"
                            onPress={saveButtonHandler}
                        />
                )
            }
            
        } else {
            return(
                <Button 
                        color="coral"
                        title="Save Record"
                        onPress={saveButtonHandler}
                    />
            )
        }
    }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Button 
            title="Check History"
            color="coral"
            onPress = {() => navigation.navigate('Record', { data: record, setter: setRecord })}
        />

        <Text style={{marginTop: 20, marginBottom: 5, fontSize: 20}}>Enter Original Price</Text>
        <TextInput 
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={priceHandler}
        />
        {errorPriceMessage()}

        <Text style={{marginTop: 20, marginBottom: 5, fontSize: 20}}>Enter Discount Percentage</Text>
        <TextInput 
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={discountHandler}
        />
        {errorDiscountMessage()}

        <Text style={{marginTop: 30}}>You Save: {youSave}</Text>
        <Text style={{marginBottom: 50}}>Final Price: {finalPrice}</Text>


        {saveButtonRenderer()}
    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
      borderWidth: 1,
      borderColor: 'gray',
      width: 300,
      borderStyle: "dashed",
      borderRadius: 10,
      fontSize: 20,
      padding: 10
  }
});
