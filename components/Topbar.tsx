import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import { router } from 'expo-router';

interface TopbarProps {
  avatar?: string;
  name?: string;
}
const Topbar: React.FC<TopbarProps> = ({ avatar, name }) => {
  return (
    <View className='flex flex-row justify-between mb-4'>
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        className='flex flex-row gap-3'
      >
        <Image
          source={{
            uri: avatar,
          }}
          className='w-11 h-11 rounded-full '
          resizeMode='contain'
        />
        <View>
          <Text className='font-rubik text-sm text-black-100'>
            Good Morning
          </Text>
          <Text className='font-rubik-medium text-base'>{name}</Text>
        </View>
      </TouchableOpacity>
      <View className='relative'>
        <Image source={icons.bell} className='w-6 h-6' resizeMode='contain' />
        <View className='rounded-full w-2 h-2 bg-primary-100 absolute top-0 right-1'></View>
      </View>
    </View>
  );
};

export default Topbar;
