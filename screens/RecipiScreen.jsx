import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loader from "../components/Loader";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, {FadeInDown} from "react-native-reanimated";



const RecipiScreen = (props) => {
  const navigation = useNavigation();
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  });

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      // console.log(response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isgradientsIndex = (meal) => {
    if (!meal) return [];
    let indices = [];
    for (let i = 1; i < 20; i++) {
      if (meal["strIngredient" + i]) {
        indices.push(i);
      }
    }
    return indices;
  };

  const getYoutubeId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      {/* <StatusBar barStyle={"light-content"} /> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
            borderRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          paddingTop: 20,
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 3,
            backgroundColor: "white",
            borderRadius: 100,
            marginLeft: 15,
          }}
        >
          <Icon name="chevron-back" size={30} color={"orange"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 4, marginRight: 15 }}
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <Icons name="heart" size={28} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            paddingHorizontal: 8,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {meal?.strMeal}
            </Text>
            <Text>{meal?.strArea}</Text>
          </View>
          <Animated.View entering={FadeInDown.delay(500).duration(600).springify().damping(20)} style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
            <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>
              Ingrediants
            </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(700).duration(600).springify().damping(20)} style={{ marginLeft: 4 }}>
              {isgradientsIndex(meal).map((i) => {
                return (
                  <View
                    key={i}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {meal["strMeasure" + i]}{" "}
                    </Text>
                    <Text>{meal["strIngredient" + i]}, </Text>
                  </View>
                );
              })}
            </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(1000).duration(600).springify().damping(20)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.8) }}>{meal?.strInstructions}</Text>
          </Animated.View>
          {meal.strYoutube && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "orange" }}
              >
                Recipi Video
              </Text>
              <View style={{width: "100%"}}>
              <YoutubeIframe
                videoId={getYoutubeId(meal.strYoutube)}
                height={300}
              />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipiScreen;
