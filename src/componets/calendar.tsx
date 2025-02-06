// @ts-nocheck
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import React, { useState, useEffect, useRef } from "react"
import colors from "../../utils/colors"

const HorizontalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dates, setDates] = useState([])
  const scrollViewRef = useRef(null)

  useEffect(() => {
    const getDates = () => {
      const datesArray = []
      const currentDate = new Date()

      // Generate dates centered around the current date
      for (let i = -30; i < 30; i++) {
        const date = new Date()
        date.setDate(currentDate.getDate() + i)
        datesArray.push(date)
      }
      setDates(datesArray)
      setSelectedDate(currentDate)
    }

    getDates()
  }, [])

  useEffect(() => {
    if (dates.length > 0) {
      scrollToCurrentDate()
    }
  }, [dates, selectedDate, scrollViewRef])

  const scrollToCurrentDate = () => {
    if (scrollViewRef.current) {
      const currentDateIndex = Math.floor(dates.length / 2)
      scrollViewRef.current.scrollTo({ x: currentDateIndex * 40, animated: false })
    }
  }

  // Format date to display day name
  const getDayName = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  // Format date to display day number
  const getDayNumber = (date) => {
    return date.getDate()
  }

  // Check if date is selected
  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  // Check if date is today
  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString()
  }

  return (
    <View style={styles.container}>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dateContainer, isSelected(date) && styles.selectedDate, isToday(date) && styles.today]}
            onPress={() => setSelectedDate(date)}
          >
            <Text  style={[styles.dayName, isSelected(date) && styles.selectedText]}>{getDayName(date)}</Text>
            <Text style={[styles.dayNumber, isSelected(date) && styles.selectedText]}>{getDayNumber(date)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_BG,
    // height: 80,
   
  },
  scrollViewContent: {
    paddingHorizontal: 4,
  },
  dateContainer: {
    width: 45,
    height: 60,
    // paddingHorizontal: 1,
    // paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
   
  },
  selectedDate: {
    backgroundColor: colors.PRIMARY_TEXT,
    borderRadius: 15,
    
  },
  today: {
    // borderWidth: 1,
    borderColor: "#D62059",
    
  },
  dayName: {
    fontSize: 12,
    color: colors.PRIMARY_TEXT,
    marginBottom: 10,
    fontFamily:'Geist',
    opacity: 0.5,
  },
  dayNumber: {
    fontSize: 16,
    color: colors.PRIMARY_TEXT,
    fontFamily:'Geist-SemiBold',
    
  },
  selectedText: {
    color: colors.PRIMARY_BG,
    
  },
 
})

export default HorizontalCalendar

