import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Icon from "react-native-vector-icons/Entypo"
import Icons from "react-native-vector-icons/AntDesign"
import Category from '../components/Category'
import Recipies from '../components/Recipies'

export default function Home() {
    const [active, setActive] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(()=> {
      getCategories();
      getRecipies();
    },[])

    const handleChangeCategory = category => {
      getRecipies(category);
      setActive(category);
      setMeals([]);
    };
    
    const getCategories = async()=> {
      try {
        const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php") 
        // console.log(response.data);
        if(response && response.data){
          setCategories(response.data.categories)
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getRecipies = async(category="Beef") => {
      try {
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        // console.log(response.data)
        if(response && response.data) {
          setMeals(response.data.meals)
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <View style={{padding: Platform.OS === "android" ? StatusBar.currentHeight : 0, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
        <Image style={styles.image} source={require("../assets/avatar.png")} />
        <Icon name='bell' size={35} style={styles.icon} />
      </View>
      <View style={{marginTop: 20}}>
        <Text style={{fontWeight: "bold"}}>Hello, Dhairya!</Text>
        <Text style={{fontSize: 30, fontWeight: 600}}>Make your own food,</Text>
        <Text style={{fontSize: 30, fontWeight: 600}}>stay at <Text style={{color: "#F57D1F"}}>home</Text></Text>
      </View>
      <View style={styles.search}>
        <TextInput placeholder='Search any recipe' style={{width: "70%"}} />
        <View style={{backgroundColor: "white", borderRadius: 100, padding: 8}}>
        <Icons name='search1' size={22} color={"black"} />
        </View>
      </View>
      <Category categories={categories} active={active} handleChangeCategory={handleChangeCategory}  />
      <Recipies categories={categories} meals={meals} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        borderRadius: 100
    },
    icon: {
        marginTop: 15,
    },
    search: {
        backgroundColor: "#C7C8CC",
        borderRadius: 25,
        padding: 10,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})