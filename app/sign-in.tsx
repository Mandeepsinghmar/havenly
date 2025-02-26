import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '@/constants/images';
import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/lib/global-provider';

const SignIn = () => {
  const { user, isLogged, fetchUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogged && user) return router.push('/');
  }, [isLogged, user]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const loginCompleted = await login();
      if (loginCompleted) {
        await fetchUser();
      } else {
        Alert.alert(
          'Authentication Error',
          'Unable to sign in with Google. Please try again.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView contentContainerClassName='h-full'>
        <Image
          className='w-full h-4/6'
          source={images.onboarding}
          resizeMode='contain'
          accessible={true}
          accessibilityLabel='Welcome illustration'
        />
        <View className='flex items-center gap-3 px-12'>
          <Text className='text-base font-rubik text-black-200 uppercase'>
            Welcome to Havenly
          </Text>
          <Text className='font-rubik-bold text-center text-3xl text-black-300'>
            Let's get you closer to{' '}
            <Text className='text-primary-100'>Your Ideal Home</Text>
          </Text>
          <Text className='font-rubik-regular text-lg text-black-200'>
            Sign in with Google to continue
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          accessibilityRole='button'
          accessibilityLabel='Sign in with Google'
          className={`mt-4 mx-8 bg-white shadow-md shadow-zinc-200 py-4 rounded-full ${
            isLoading ? 'opacity-70' : ''
          }`}
        >
          <View className='flex flex-row items-center justify-center gap-3'>
            <Image
              source={icons.google}
              className='w-6 h-6'
              resizeMode='contain'
              accessible={false}
            />
            <Text className='font-rubik-medium text-lg text-black-200'>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
