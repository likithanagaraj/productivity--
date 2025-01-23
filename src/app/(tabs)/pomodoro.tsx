import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../../componets/header'

const Pomodoro = () => {
  return (
    <View className="h-full w-full bg-zinc-900 ">
    <HeaderBar title="Pomodoro" icon1="magnify" icon2="calendar" />
  
    
  </View>
  )
}

export default Pomodoro

const styles = StyleSheet.create({})