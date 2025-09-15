import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Calendar } from 'react-native-calendars';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function CardSubscription({ id, status, startDate, endDate, createdAt }) {
  const [expanded, setExpanded] = useState(false);

  const formattedStart = startDate?.split('T')[0];
  const formattedEnd = new Date(endDate).toLocaleDateString('pt-BR');
  const formattedCreated = new Date(createdAt).toLocaleDateString('pt-BR');

  const markedDate = {
    [formattedStart]: {
      selected: true,
      marked: true,
      selectedColor: '#00adf5',
    },
  };

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.status}>Status: {status}</Text>
          {expanded && (
            <>
              <Calendar markedDates={markedDate} />
              <Text style={styles.extra}>Início: {formattedStart}</Text>
              <Text style={styles.extra}>Fim: {formattedEnd}</Text>
              <Text style={styles.extra}>Criado em: {formattedCreated}</Text>
              <Text style={styles.extra}>ID da assinatura: {id}</Text>
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
  },
  content: {
    gap: 8,
  },
  status: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  extra: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
