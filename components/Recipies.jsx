import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from "react-native-reanimated"
import Loader from "./Loader";
import { useNavigation } from "@react-navigation/native";
// import { CachedImage } from "../../helpers/CachedImage";

export default function Recipies({ categories, meals }) {
    const navigation = useNavigation();

  return (
    <View>
      <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
        Recipies
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (<Loader />) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <CardItem item={item} index={i} navigation={navigation}/>}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}
const CardItem = ({ item, index, navigation }) => {
    let isEven = index%2==0;
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(20)}>
      <TouchableOpacity style={{width: "100%", paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0, display: "flex", justifyContent: "center", marginBottom: 4, gap: 5}} onPress={()=> navigation.navigate("recipi", {...item})}>
        
      <Image  source={{ uri: item.strMealThumb }} style={{ width: "100%", height: index%3==0 ? hp(25) : hp(35), backgroundColor: "black", borderRadius: 35 }} />
      {/* <CachedImage uri={item.strMealThumb} style={{ width: "100%", height: index%3==0 ? hp(25) : hp(35), backgroundColor: "black", borderRadius: 35 }} /> */}
      <Text>{item.strMeal.length > 20 ? item.strMeal.slice(0,20)+"..." : item.strMeal}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({});
