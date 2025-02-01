import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

interface TimeState {
  millis: string;
  secs: string;
  hours: string;
  minutes: string;
}

const defaultState: TimeState = {
  millis: '00',
  secs: '00',
  hours: '00',
  minutes: '00',
};

const getZeroAppendedString = (num: number): string => {
  return ('0' + num).slice(-2);
};

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<TimeState>(defaultState);
  const [isStarted, setIsStarted] = useState(false);
  const [startDuration, setStartDuration] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const calculateTime = useCallback((start: number): TimeState => {
    const millisecondsPassed = new Date().getTime() - start;
    const millisecondsTimer = getZeroAppendedString(
      Number(String(millisecondsPassed % 1000).substring(0, 2))
    );
    const secondsPassed = Math.floor(millisecondsPassed / 1000);
    const secondsPassedTimer = secondsPassed % 60;
    const minutesPassed = Math.floor(secondsPassed / 60);
    const minutesPassedTimer = minutesPassed % 60;
    const hoursPassed = Math.floor(minutesPassed / 60) % 24;

    return {
      millis: millisecondsTimer,
      secs: getZeroAppendedString(secondsPassedTimer),
      hours: getZeroAppendedString(hoursPassed),
      minutes: getZeroAppendedString(minutesPassedTimer),
    };
  }, []);

  const startTimer = useCallback(() => {
    if (!isStarted) {
      const start = new Date().getTime();
      setStartDuration(start);
      const newIntervalId = setInterval(() => {
        if (start) {
          setTime(calculateTime(start));
        }
      }, 20);
      setIntervalId(newIntervalId);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsStarted(prev => !prev);
  }, [isStarted, intervalId, calculateTime]);

  const resetTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTime(defaultState);
    setIsStarted(false);
    setIntervalId(null);
    setStartDuration(null);
  }, [intervalId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.clockContainer}>
        <View style={styles.headingBar}>
          <Text  style={styles.headingText}>Stopwatch</Text>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {time.hours}:{time.minutes}:{time.secs}:{time.millis}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              isStarted ? styles.stopButton : styles.startButton
            ]}
            onPress={startTimer}
          >
            <Text style={styles.buttonText}>
              {isStarted ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={resetTimer}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181B',
  
  },
  clockContainer: {
    width: '90%',
    backgroundColor: '#18181B',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // elevation: 5,
    color: '#fff',
  },
  headingBar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:'Poppins-SemiBold',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:'Poppins-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#D62059',
  },
  startButton: {
    backgroundColor: '#D62059',
  },
  stopButton: {
    backgroundColor: '#D62059',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
  },
});

export default Stopwatch;