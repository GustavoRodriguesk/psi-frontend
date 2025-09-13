import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Calendar } from 'react-native-calendars';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function CardMood({ id, texto, sentimento, createdAt }) {
  const [expanded, setExpanded] = useState(false);

  const dateOnly = createdAt?.split('T')[0]; // '2025-09-13'

  const markedDate = {
    [dateOnly]: {
      selected: true,
      marked: true,
      selectedColor: '#FF6347', // uma cor mais emocional
    },
  };

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <View style={styles.card}>
        {/* Calendário expandido */}
        {expanded && (
          <View style={styles.calendarContainer}>
            <Calendar markedDates={markedDate} />
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.sentimento}>Sentimento: {sentimento}</Text>
          <Text style={styles.texto}>{texto}</Text>

          {expanded && (
            <>
              <Text style={styles.extra}>Data: {dateOnly}</Text>
              <Text style={styles.extra}>ID: {id}</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    padding: 10,
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'column',
    gap: 10,
  },
  calendarContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  content: {
    gap: 6,
  },
  sentimento: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  texto: {
    fontSize: 16,
    color: '#555',
  },
  extra: {
    marginTop: 6,
    fontSize: 14,
    color: '#777',
  },
});
