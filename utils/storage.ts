import AsyncStorage from '@react-native-async-storage/async-storage';

 interface Tasks {
  id: string;
  title: string;
  subtasks: string[];
}
const TASKS_STORAGE_KEY = "tasks";

export const saveTask = async (newTask: Tasks) => {
  try {
    // console.log("Starting to save task:", newTask);
    
    // Get existing tasks
    const existingTasks = await getTasks();
    // console.log("Existing tasks:", existingTasks);
    
    let updatedTasks: Tasks[];
    const taskIndex: number = existingTasks.findIndex((t: Tasks) => t.id === newTask.id);
    
    if (taskIndex >= 0) {
      // Update existing task
      updatedTasks = existingTasks.map((task: Tasks, index: number): Tasks => 
        index === taskIndex ? newTask : task
      );
    } else {
      // Add new task
      updatedTasks = [...existingTasks, newTask];
    }
    
    // Save to storage
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    // console.log("Tasks saved successfully:", updatedTasks);
    
    return updatedTasks;
  } catch (error) {
    // console.error("Error in saveTask:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    const tasks = data ? JSON.parse(data) : [];
    // console.log("Retrieved tasks:", tasks);
    return tasks;
  } catch (error) {
    // console.error("Error in getTasks:", error);
    return [];
  }
};


export const deleteTask = async (taskId: string) => {
  try {
    // Get the existing tasks
    const existingTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (existingTasks) {
      // Parse existing tasks and filter out the task you want to delete
      const tasks = JSON.parse(existingTasks);
      const updatedTasks: Tasks[] = tasks.filter((task: Tasks) => task.id !== taskId);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      console.log("Task deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting task from storage:", error);
  }
};


// Habits

interface Habits{
  id:string;
  habittitle:string;
  description?:string;
  priority?:string;
}

const HABITS_STORAGE_KEY = "habits";


export const saveHabits = async (newHabit: Habits) => {
  try {
   
    const existingHabits = await getHabits();
    
    let updatedHabits: Habits[];
    const taskIndex: number = existingHabits.findIndex((t: Habits) => t.id === newHabit.id);
    
    if (taskIndex >= 0) {
      // Update existing task
      updatedHabits = existingHabits.map((task: Habits, index: number): Habits => 
        index === taskIndex ? newHabit : task
      );
    } else {
      // Add new task
      updatedHabits = [...existingHabits, newHabit];
    }
    
    // Save to storage
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
    // console.log("Habits saved successfully:", updatedHabits);
    
    return updatedHabits;
  } catch (error) {
    // console.error("Error in saveTask:", error);
    throw error;
  }
};

export const getHabits = async () => {
  try {
    const data = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    const Habits = data ? JSON.parse(data) : [];
    // console.log("Retrieved Habits:", Habits);
    return Habits;
  } catch (error) {
    // console.error("Error in getHabits:", error);
    return [];
  }
};


export const deleteHabits = async (taskId: string) => {
  try {
    // Get the existing Habits
    const existingHabits = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    if (existingHabits) {
      // Parse existing Habits and filter out the task you want to delete
      const Habits = JSON.parse(existingHabits);
      const updatedHabits: Habits[] = Habits.filter((task: Habits) => task.id !== taskId);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
      console.log("Task deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting task from storage:", error);
  }
};