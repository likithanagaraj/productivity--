import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import colors from '../../../utils/colors'

const NumericCategory = () => { 
  const [habitName, sethabitName] = useState("");
  const [description, setdescription] = useState("");
  const [error, seterror] = useState("");

  const handleSubmitHabit = () => {
    
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Define Your Habit</Text>

        <View className="flex flex-col gap-7">
          <View>
            <TextInput
              mode="outlined"
              selectionColor="#666666"
              cursorColor="#666666"
              outlineColor="#666666"
              activeOutlineColor={colors.CTA}
              label="Habit Name"
              value={habitName}
              onChangeText={(text) => sethabitName(text)}
            />
            {error && <Text style={{color:colors.CTA}}>{error}</Text>}
          </View>
          <TextInput
            mode="outlined"
            selectionColor="#666666"
            cursorColor="#666666"
            outlineColor="#666666"
            activeOutlineColor={colors.CTA}
            label="Description"
            value={description}
            onChangeText={(text) => setdescription(text)}
          />

          <Button
            mode="contained"
            onPress={handleSubmitHabit}
            style={styles.submitButton}
            labelStyle={{ color: "white", fontFamily: "Geist-SemiBold" }}
          >
            Create Habit
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NumericCategory

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: colors.PRIMARY_BG,
    },
    container: {
      flex: 1,
      padding: 32,
      backgroundColor: "#c",
    },
    title: {
      fontFamily: "Geist-SemiBold",
      color: "#D62059",
      fontSize: 21,
      marginBottom: 20,
    },
    submitButton: {
      // marginTop: 20,
      backgroundColor: "#D62059",
      borderRadius: 7,
    },
})