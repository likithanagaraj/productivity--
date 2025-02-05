import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { getCategories, saveCategories } from "../../../utils/storage";

const TaskCategory = () => {
  const [openbottomSheet, setopenbottomSheet] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [errors, seterrors] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [categoryDescription, setcategoryDescription] = useState("");
  const generateId = () => {
    return crypto.randomUUID(); // Generates a universally unique identifier (UUID)
  };
  const handleOutsideClick = () => {
    setopenbottomSheet(false);
  };
  const handleSubmitHabit = async () => {
    if (categoryName.trim() === "") {
      seterrors("Please enter a category name");
      return;
    }
    try {
      const newcategory = {
        id: generateId(),
        categorytitle: categoryName.trim(),
        description: categoryDescription,
      };
      console.log(newcategory);
      await saveCategories(newcategory);
      router.push("/task");
    } catch (error) {
      Alert.alert("Error", "Failed to save task");
    }
  };
  const fetchCategories = async () => {
    const categories = await getCategories();
    console.log(categories);
    setcategoryList(categories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.PRIMARY_BG,
        height: "100%",
        width: "100%",
        padding: 25,
      }}
      className="flex-1 flex-col gap-8"
    >
      <View className="flex-col">
        <Text
          style={{ fontFamily: "Geist-Bold", fontSize: 25 }}
          className="text-white"
        >
          Category
        </Text>
        <Text
          style={{ fontFamily: "Geist", fontSize: 14 }}
          className="text-white/50"
        >
          Select or add new category
        </Text>
      </View>
      <View className="flex-1 flex-row justify-between gap-10 flex-wrap">
        {categoryList.map((category: any) => (
          <CategoryList
            key={category.id}
            icon="home"
            name={category.categorytitle}
          />
        ))}
        <CategoryList icon="home" name="Home" />
        <CategoryList icon="medkit-outline" name="Health" />
        <CategoryList icon="american-football-outline" name="Sports" />
        <CategoryList icon="book-outline" name="Reading" />
      </View>
      <Button
        onPress={() => {
          setopenbottomSheet(true);
        }}
        className=""
        mode="contained"
        labelStyle={{ fontFamily: "Geist-SemiBold", color: colors.PRIMARY_BG }}
        style={{ backgroundColor: colors.CTA }}
      >
        Create Category
      </Button>
      {openbottomSheet && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View className="absolute top-0 bottom-0 left-0 right-0 bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={{ backgroundColor: colors.PRIMARY_BG }}
                className="absolute bottom-0 left-0 right-0 p-5"
              >
                <Text
                  style={{ fontFamily: "Geist-Bold" }}
                  className="text-white text-xl mb-5"
                >
                  New Category
                </Text>
                <View className="flex flex-col gap-8">
                  <View>
                    <TextInput
                      mode="outlined"
                      style={{
                        backgroundColor: colors.LIGHT_BG,
                        fontFamily: "Geist-Regular",
                        color: colors.PRIMARY_TEXT,
                      }}
                      cursorColor="#666666"
                      outlineColor={colors.LIGHT_BG}
                      activeOutlineColor={colors.CTA}
                      label="Enter Category name"
                      value={categoryName}
                      onChangeText={(text) => setcategoryName(text)}
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
                    outlineColor={colors.LIGHT_BG}
                    activeOutlineColor={colors.CTA}
                    label="Enter task Description"
                    value={categoryDescription}
                    onChangeText={(text) => setcategoryDescription(text)}
                  />
                  <Button
                    mode="contained"
                    onPress={handleSubmitHabit}
                    style={styles.submitButton}
                    labelStyle={{
                      color: colors.PRIMARY_BG,
                      fontFamily: "Geist-Bold",
                    }}
                  >
                    Create Habit
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default TaskCategory;

const styles = StyleSheet.create({
  submitButton: {
    // marginTop: 20,
    backgroundColor: colors.CTA,

    borderRadius: 7,
  },
});

export function CategoryList({ icon, name }: any) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/task",
          params: { category: name },
        });
      }}
      className="w-36 h-32 flex items-center justify-center gap-2 rounded-lg"
      style={{ backgroundColor: colors.LIGHT_BG }}
    >
      <Ionicons name={icon} size={28} color={colors.PRIMARY_TEXT} />
      <Text
        style={{ fontFamily: "Geist-Medium", fontSize: 15 }}
        className="text-white"
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
