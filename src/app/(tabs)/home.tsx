import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../../componets/header'

const Home = () => {
  return (
    <View className="h-full w-full bg-zinc-900 ">
    <HeaderBar title="Home" icon1="magnify" icon2="calendar" />
  
    
  </View>
  )
}

export default Home

const styles = StyleSheet.create({})