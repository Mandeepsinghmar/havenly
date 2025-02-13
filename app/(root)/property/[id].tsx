import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView className=' px-5 py-3 h-full bg-white '>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Property {id}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
