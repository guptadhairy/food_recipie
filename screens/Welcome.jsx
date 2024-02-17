import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign"

export default function Welcome({navigation}) {
  return (
    <View style={{padding: Platform.OS === "android" ? StatusBar.currentHeight : 0, flex: 1, backgroundColor: "#265073", justifyContent: "center", alignItems: "center"}}>
      <LottieView style={styles.lottie} source={require('../assets/food.json')} autoPlay loop />
      <Text style={{color: "white", fontSize: 30, fontWeight:"bold"}}>FlavorFiesta</Text>
      <Text style={{color: "white"}}>Every Bite is a Culinary Celebration!</Text>
      <Button style={styles.btn} onPress={() => navigation.navigate("home")}>
        <View style={styles.arrow}>
        <Text style={{fontSize: 15}}>Let's Start</Text>
        <Icon name='arrowright' size={20} color={"#265073"} />
        </View>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    lottie: {
        width: 300,
        height: 300,
    },
    btn: {
        width: "70%",
        backgroundColor: "#9AD0C2",
        marginTop: 20,
        display: "flex",
    },
    arrow: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }
})