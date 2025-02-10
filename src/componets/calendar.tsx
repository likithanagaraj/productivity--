// @ts-nocheck
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import React, { useState, useEffect, useRef } from "react"
import colors from "../../utils/colors"
interface CalendarProps {
  onSelectDate: (date: Date) => void;
  selectedDates: Date;
}
const HorizontalCalendar = ({ onSelectDate, selectedDates }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(selectedDate || new Date())
  const [dates, setDates] = useState([])
  const scrollViewRef = useRef(null)
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };
  const scrollToDate = (date) => {
    if (scrollViewRef.current) {
      const dateIndex = dates.findIndex(d => d.toDateString() === date.toDateString())
      if (dateIndex !== -1) {
        const scrollX = dateIndex * 40 // 45 is the width of each date container
        scrollViewRef.current.scrollTo({ x: scrollX, animated: true })
      }
    }
  }
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
      scrollToDate(selectedDates)
    }
  }, [dates, selectedDate])

  const scrollToCurrentDate = () => {
    if (scrollViewRef.current) {
      const currentDateIndex = Math.floor(dates.length / 2)
      scrollViewRef.current.scrollTo({ x: currentDateIndex * 80, animated: false })
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
         <View>
          
          <View className="flex flex-col gap-1 items-center" key={index}>
            <TouchableOpacity
            key={index}
            style={[styles.dateContainer, isSelected(date) && styles.selectedDate]}
            onPress={() => handleDateSelection(date)}
          >

            <Text  style={[styles.dayName, isSelected(date) && styles.selectedText]}>{getDayName(date)}</Text>
            <Text style={[styles.dayNumber, isSelected(date) && styles.selectedText]}>{getDayNumber(date)}</Text>
           
          </TouchableOpacity>
          <View className="w-5 " style={[styles.notToday,isToday(date) && styles.today]}>
            
          </View>
          </View>
         </View>
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
    // borderColor: "#D62059",
    borderBottomColor: colors.CTA,
    borderBottomWidth: 2,
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

