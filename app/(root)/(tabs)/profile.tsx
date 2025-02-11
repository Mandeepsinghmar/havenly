import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';

const Profile = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView contentContainerClassName='h-full px-10 pt-2'>
        <View className='flex flex-row justify-between'>
          <Text className='font-rubik-semibold text-lg text-black-300 '>
            Profile
          </Text>
          <Image source={icons.bell} className='w-6 h-6' resizeMode='contain' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
