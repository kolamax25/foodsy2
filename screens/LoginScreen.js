import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import db from "../config";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import { RFValue } from "react-native-responsive-fontsize";
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      Cpassword: "",
      age: "",
      dob: "",
      isModalVisible: false,
    };
  }

  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("HomeScreen")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (email, password, Cpassword) => {
    if (password !== Cpassword) {
      return Alert.alert("Passwords do not match");
    } else {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email_id: this.state.email,  
            age: this.state.age,
            dob: this.state.dob,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>

              <TextInput
                style={styles.input}
                placeholder={"First Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={"Last Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    email: text,
                  });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={"Re-enter Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    Cpassword: text,
                  });
                }}
              />

              <CustomInput
                placeholder={"Age"}
                onChangeText={(text) => {
                  this.setState({
                    age: text,
                  });
                }}
              />
              <CustomInput
                placeholder={"Date of Birth"}
                onChangeText={(text) => {
                  this.setState({
                    dob: text,
                  });
                }}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.userSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.Cpassword
                  )
                }
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState({ isModalVisible: false })}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.upperConatainer}>
            <Image
              source={require("../assets/cashew.jpeg")}
              style={{ width: 400, height: 400 }}
            />
          </View>
          {this.showModal()}
          <View style={styles.middleContainer}>
            <CustomInput
              placeholder={"abc@example.com"}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />
            <CustomInput
              placeholder={"Enter Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />

            <TouchableOpacity
              style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
              onPress={() => {
                this.userLogin(this.state.email, this.state.password);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      //Image
      //customInput
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff1000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    alignSelf: "center",
    margin: 20,
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: 20,
  },
  scanButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 10,
    borderRadius: 15,
    height: 50,
    width: 75,
  },

  InputView: {
    flexDirection: "row",
  },
  InputBox: {
    borderWidth: 1.5,
    width: 250,
    height: 50,
    fontSize: 20,
    marginTop: 10,
    alignSelf: "center",
  },

  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  input: {
    width: "80%",
    height: 55,
    borderColor: "#ff8a65",
    alignItems: "center",
    margin: 5,
    borderBottomWidth: 1.5,
    alignSelf: "center",
  },
  KeyboardAvoidingView: {
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
  }
});
