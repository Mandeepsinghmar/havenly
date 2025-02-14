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
import { login } from '@/auth/appwrite';
import { router } from 'expo-router';

const SignIn = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogin = async () => {
    const loginCompleted = await login();
    if (loginCompleted) {
      setShouldRedirect(true);
    } else {
      Alert.alert('Error', 'Failed to login');
    }
  };
  if (shouldRedirect) {
    router.push('/');
  }

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
