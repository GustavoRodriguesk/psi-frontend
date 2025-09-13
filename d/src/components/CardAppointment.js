import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { Calendar } from 'react-native-calendars';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function CardAppointment({ id, status, message, data }) {
  const [expanded, setExpanded] = useState(false);

  const dateOnly = data?.split("T")[0];

  const markedDate = {
    [dateOnly]: {
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
        {/* Se não estiver expandido, mostra a imagem */}
        {!expanded ? (
          <Image
            style={styles.logo}
            source={{ uri: 'https://via.placeholder.com/60' }} // Substituir por imgUrl real se tiver
          />
        ) : (
          // Mostra o calendário com data marcada
          <View style={{ flex: 1 }}>
            <Calendar markedDates={markedDate} />
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.message}>{message}</Text>

          {expanded && (
            <>
              <Text style={styles.extra}>Data: {dateOnly}</Text>
              <Text style={styles.extra}>ID: {id}</Text>
              {/* Adicione mais campos aqui se necessário */}
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
  },
  message: {
    color: '#777777',
  },
  extra: {
    marginTop: 6,
    fontSize: 14,
    color: '#444',
  },
});
