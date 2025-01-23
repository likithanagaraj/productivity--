import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../../componets/header'

const Task = () => {
  return (
    <View className="h-full w-full bg-zinc-900 ">
    <HeaderBar title="Task" icon1="magnify" icon2="calendar" />
  
    
  </View>
  )
}

export default Task

const styles = StyleSheet.create({})