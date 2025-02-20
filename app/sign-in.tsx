import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '@/constants/images';
import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/lib/global-provider';

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href='/' />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView contentContainerClassName='h-full'>
        <Image
          className='w-full h-4/6'
          source={images.onboarding}
          resizeMode='contain'
        />
        <View className='flex items-center gap-3 px-12'>
          <Text className='text-base font-rubik text-black-200 uppercase'>
            Welcome to Havenly
          </Text>
          <Text className='font-rubik-bold text-center text-3xl text-black-300 '>
            Let’s get you closer to{' '}
            <Text className='text-primary-100'>Your Ideal Home</Text>
          </Text>
          <Text className='font-rubik-regular text-lg text-black-200'>
            Login to Real Scout with Google
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          className=' mt-4 mx-8 bg-white shadow-md shadow-zinc-200 py-4 rounded-full '
        >
          <View className='flex flex-row items-center justify-center gap-3 '>
            <Image
              source={icons.google}
              className='w-6 h-6'
              resizeMode='contain'
            />
            <Text className='font-rubik-medium text-lg text-black-200'>
              Sign Up with Google
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
