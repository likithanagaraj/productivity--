import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../../componets/header'
import colors from '../../../utils/colors'

const Achievements = () => {
  return (
    <View style={{backgroundColor:colors.PRIMARY_BG}} className="h-full w-full  ">
    <HeaderBar title="Achievements" icon1="magnify" icon2="calendar" />
  
    
  </View>
  )
}

export default Achievements

const styles = StyleSheet.create({})