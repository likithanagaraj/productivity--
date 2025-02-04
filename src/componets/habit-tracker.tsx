import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";

const HabitTracker = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How often do you want to do it</Text>
      <View>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>
    </View>
  );
};

export default HabitTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#c",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    color: "#D62059",
    fontSize: 21,
    marginBottom: 20,
  },
});
