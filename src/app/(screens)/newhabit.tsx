import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, SegmentedButtons, TextInput, Dialog, Portal } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import colors from "../../../utils/colors";
import { saveHabits, getHabits, deleteHabits, Habits } from "../../../utils/storage";
import 'react-native-get-random-values';
import Ionicons from "@expo/vector-icons/Ionicons";


const Newhabit = () => {
  const { id: idParam } = useLocalSearchParams();
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  
  const [value, setValue] = React.useState<string>("");
  const [habitName, setHabitName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadHabitData = async () => {
      if (id) {
        try {
          const habits = await getHabits();
          const existingHabit = habits.find((habit: Habits) => habit.id === id);
          if (existingHabit) {
            setHabitName(existingHabit.habittitle);
            setDescription(existingHabit.description);
            setValue(existingHabit.priority);
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to load habit data');
        }
      }
    };
    
    loadHabitData();
  }, [id]);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmitHabit = async () => {
    if (habitName.trim() === "") {
      setErrors("Please enter a habit name");
      return;
    }

    try {
      const habitData: Habits = {
        id: id || generateId(),
        habittitle: habitName.trim(),
        description: description,
        priority: value,
      };
      
      await saveHabits(habitData);
      router.push("/habit");
    } catch (error) {
      Alert.alert('Error', `Failed to ${id ? 'update' : 'save'} habit`);
    }
  };

  const handleDeleteHabit = async () => {
    try {
      if (id) {
        await deleteHabits(id);
        setDeleteDialogVisible(false);
        router.push("/habit");
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete habit');
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: colors.PRIMARY_BG }}
        className="h-full w-full px-6 py-8 flex flex-col justify-between"
      >
        <View className="flex flex-col gap-8">
          <View className="flex flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "Geist-SemiBold", color: colors.PRIMARY_TEXT }}
              className="text-[22px]"
            >
              {id ? 'Edit Habit' : 'Create Habit'}
            </Text>
            {id && (
              <Button
                mode="text"
                
                onPress={() => setDeleteDialogVisible(true)}
                labelStyle={{
                  fontFamily: "Geist-Medium",
                }}
              >
                <Ionicons name="trash" size={20} color={colors.PRIMARY_TEXT} />
              </Button>
            )}
          </View>

          <View className="flex flex-col gap-5">
            <View>
              <TextInput
                mode="outlined"
                style={{
                  backgroundColor: colors.LIGHT_BG,
                  fontFamily: "Geist-Regular",
                  color: colors.PRIMARY_TEXT,
                }}
                cursorColor="#666666"
                outlineColor="#666666"
                activeOutlineColor={colors.CTA}
                label="Enter habit name"
                value={habitName}
                onChangeText={(text) => {
                  setHabitName(text);
                  setErrors("");
                }}
              />
              {errors && <Text className="text-red-500">{errors}</Text>}
            </View>
            <TextInput
              mode="outlined"
              style={{
                backgroundColor: colors.LIGHT_BG,
                fontFamily: "Geist-Regular",
                color: colors.PRIMARY_TEXT,
                paddingBottom: 35,
              }}
              cursorColor="#666666"
              outlineColor="#666666"
              activeOutlineColor={colors.CTA}
              label="Enter habit description"
              value={description}
              onChangeText={setDescription}
            />

            <SafeAreaView>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: "Low",
                    label: "Low",
                    testID: "1",
                    style: {
                      borderRadius: 5,
                      borderColor: "#666666",
                      backgroundColor:
                        value === "Low" ? colors.CTA : colors.LIGHT_BG,
                    },
                    labelStyle: {
                      color:
                        value === "Low"
                          ? colors.PRIMARY_BG
                          : colors.PRIMARY_TEXT,
                      fontFamily:
                        value === "Low" ? "Geist-SemiBold" : "Geist-Regular",
                    },
                  },
                  {
                    value: "Medium",
                    label: "Medium",
                    testID: "2",
                    style: {
                      backgroundColor:
                        value === "Medium" ? colors.CTA : colors.LIGHT_BG,
                      borderColor: "#666666",
                    },
                    labelStyle: {
                      color:
                        value === "Medium"
                          ? colors.PRIMARY_BG
                          : colors.PRIMARY_TEXT,
                      fontFamily:
                        value === "Medium" ? "Geist-SemiBold" : "Geist-Regular",
                    },
                  },
                  {
                    value: "High",
                    label: "High",
                    testID: "3",
                    style: {
                      borderRadius: 5,
                      borderColor: "#666666",
                      backgroundColor:
                        value === "High" ? colors.CTA : colors.LIGHT_BG,
                    },
                    labelStyle: {
                      color:
                        value === "High"
                          ? colors.PRIMARY_BG
                          : colors.PRIMARY_TEXT,
                      fontFamily:
                        value === "High" ? "Geist-SemiBold" : "Geist-Regular",
                    },
                  },
                ]}
              />
            </SafeAreaView>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmitHabit}
          style={styles.submitButton}
          labelStyle={{
            color: colors.PRIMARY_BG,
            fontFamily: "Geist-Bold",
          }}
        >
          {id ? 'Update Habit' : 'Create Habit'}
        </Button>

        <Portal>
          <Dialog
            visible={deleteDialogVisible}
            onDismiss={() => setDeleteDialogVisible(false)}
            style={{backgroundColor: colors.PRIMARY_BG}}
          >
            <Dialog.Title style={{ fontFamily: "Geist-Bold" }}>Delete Habit</Dialog.Title>
            <Dialog.Content>
              <Text style={{ fontFamily: "Geist-Medium",color:colors.PRIMARY_TEXT }}>
                Are you sure you want to delete this habit? This action cannot be undone.
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
              <Button 
                onPress={() => setDeleteDialogVisible(false)}
                labelStyle={{ fontFamily: "Geist-Medium" ,color:colors.PRIMARY_TEXT}}
              >
                Cancel
              </Button>
              <Button 
                onPress={handleDeleteHabit}
                textColor={colors.CTA}
                labelStyle={{ fontFamily: "Geist-Bold" }}
              >
                Delete
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

export default Newhabit;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.CTA,
    borderRadius: 7,
  },
});