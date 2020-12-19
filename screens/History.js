import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

export default function RecordScreen({ navigation, route }) {

  const data = route.params.data;  
  const setter = route.params.setter;

  const [ deleteMessage, setDeleteMessage ] = useState("");

  const deleteHandler = () => {
      setter([[]]);
      setDeleteMessage("Record Deleted");
  };

  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
       <Button 
       title="Clear History" 
       onPress={deleteHandler}
       color="coral"
       /> 
       <Text>{deleteMessage}</Text>

      <View style={styles.row}>
           <Text style={styles.head}>Original Price</Text>
           <Text style={styles.head}>-</Text>
           <Text style={styles.head}>Discount%</Text>
           <Text style={styles.head}>=</Text>
           <Text style={styles.head}>Final Price</Text>
      </View>

        <ScrollView>
            {
                data.map((item, index) => {
                    if(index != 0){
                        return(
                            <TouchableOpacity key={index}>
                                <View style={styles.row}>
                                    <Text style={styles.cell}>{item[0]}</Text>
                                    <Text style={styles.cell}>-</Text>
                                    <Text style={styles.cell}>{item[1]}</Text>
                                    <Text style={styles.cell}>=</Text>
                                    <Text style={styles.cell}>{(item[0] - ((item[1] / 100) * item[0])).toFixed(2)}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    
                })
            }
        </ScrollView>

        {/* {
            data.map((item) =>{
                return(
                    <Text>{item}</Text>
                    
                )
            })
        } */}

    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  row: {
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 5,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
  },
  cell: {
    width: 70,
    textAlign: 'center'
  },
  head: {
      textAlign: 'center',
      width: 70,
      fontWeight: 'bold',
      color: 'black'
  }
});
