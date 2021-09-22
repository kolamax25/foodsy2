import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      dish_id: this.props.story.key,
      dish_data: this.props.story.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  likeAction = () => {
    // console.log("this.state.story_id",this.state.story_id)
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.dish_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.dish_id)
        .child("rating")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("StoryScreen", {
              dish: dish,
              dish_id:this.state.dish_id
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={styles.cardContainer}>
            
            <Image
              
            ></Image>

            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={
                    styles.dishNameText
                  }
                >
                  {dish.title}
                </Text>
                <Text
                  style={
                    styles.dishChefText
                  }
                >
                  {dish.chef}
                </Text>
                
                <Text
                  style={
                    this.styles.recipeText
                  }
                >
                  {this.props.dish.recipe}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  styles.rating
                }
                >
                <Ionicons/>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }


const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  dishNameText: {
    fontSize: RFValue(25),
    color: "white"
  },
 
  dishChefText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  
  recipeContainer: {
    marginTop: RFValue(5)
  },
  recipeText: {
    fontSize: RFValue(13),
    color: "white"
  },
  
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  rating: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
 
  likeText: {
    color: "white",
    
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  },
 
});
