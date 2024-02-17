import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Animated, {FadeInDown} from "react-native-reanimated"

const Category = ({ categories, active, handleChangeCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(1000).springify()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
            categories.map((cat, index)=> {
                let isActive = cat.strCategory === active;
                return(
                    <TouchableOpacity key={index} style={styles.category} onPress={()=> handleChangeCategory(cat.strCategory)}>
                        <View style={{padding: 10, marginTop: 10}}>
                            
                            <Image source={{uri: cat.strCategoryThumb}} style={{width: 50, height: 50, borderRadius: 100}}/>
                        </View>
                        {
                            isActive ? <Text style={{color: "orange", fontWeight: "bold"}}>{cat.strCategory}</Text> : <Text>{cat.strCategory}</Text>
                        }
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}

export default Category

const styles = StyleSheet.create({
    category: {
        display: "flex",
        alignItems: "center",
    }
})