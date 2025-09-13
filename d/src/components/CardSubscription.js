import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { Calendar } from 'react-native-calendars';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function CardSubscription({ id, status, startDate, endDate, createdAt }) {
  const [expanded, setExpanded] = useState(false);

  const formattedStartDate = startDate?.split('T')[0];
  const formattedEndDate = new Date(endDate).toLocaleDateString('pt-BR');
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString('pt-BR');

  const markedDate = {
    [formattedStartDate]: {
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
        {/* Coluna esquerda: imagem ou calendário */}
        {!expanded ? (
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/711/711284.png' }} // Ícone de assinatura (exemplo)
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Calendar markedDates={markedDate} />
          </View>
        )}

        {/* Coluna direita: conteúdo do card */}
        <View style={styles.content}>
          <Text style={styles.status}>Status: {status}</Text>

          {expanded && (
            <>
              <Text style={styles.extra}>Início: {formattedStartDate}</Text>
              <Text style={styles.extra}>Fim: {formattedEndDate}</Text>
              <Text style={styles.extra}>Criada em: {formattedCreatedAt}</Text>
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
    flexDirection: 'row',
    gap: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    gap: 6,
    flex: 1,
  },
  status: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  extra: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
  },
});
