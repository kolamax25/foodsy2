import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const CustomButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.button, props.style]}
  >
    <Text style={[styles.buttonText, props.titleStyle]}>{props.title}</Text>
  </TouchableOpacity>
);
export default CustomButton

const styles = StyleSheet.create({
  button: {
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff1000",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    alignSelf: 'center',
    margin: 20,
  },
  buttonText: {
    color:'#ffff',
   fontWeight:'200',
   fontSize:20
  },
  container: {
    flex:1,
    backgroundColor:'#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
