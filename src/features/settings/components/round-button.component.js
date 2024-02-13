import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export const RoundButton = ({ onPress }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    onPress();
    setIsOn(!isOn);
  };

  return (
    <TouchableOpacity onPress={toggleButton}>
      <View
        style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonOn: {
    backgroundColor: "#2ecc71",
  },
  buttonOff: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
