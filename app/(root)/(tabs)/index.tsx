import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View className='flex justify-center items-center flex-1 '>
      <Text className=' text-4xl text-blue-500 text-center font-rubik-extrabold'>
        Hello
      </Text>
      <Link href='/explore'>Explore</Link>
      <Link href='/profile'>Profile</Link>
      <Link href='/sign-in'>Sign In</Link>
      <Link href='/property/:1'>Property</Link>
    </View>
  );
};

export default Index;
