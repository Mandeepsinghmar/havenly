import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { getUserInfo, logout } from '@/auth/appwrite';
import { Redirect } from 'expo-router';

const Profile = () => {
  const [user, setUser] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const userInfo = async () => {
      const result = await getUserInfo();
      console.log(result);
      setUser(result);
    };
    userInfo();
  }, []);

  if (shouldRedirect) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView contentContainerClassName='h-full px-10 pt-2'>
        <View className='flex flex-row justify-between'>
          <Text className='font-rubik-semibold text-lg text-black-300 '>
            Profile
          </Text>
          <Image source={icons.bell} className='w-6 h-6' resizeMode='contain' />
        </View>

        <View className='flex justify-center items-center gap-4'>
          <Image
            source={{
              uri: user?.avatar,
            }}
            className='w-36 h-36 rounded-full '
            resizeMode='contain'
          />
          <Text className='font-rubik-semibold text-2xl'>{user?.name}</Text>
        </View>

        <TouchableOpacity
          onPress={async () => {
            const msg = await logout();
            if (msg) {
              setShouldRedirect(true);
              return <Redirect href='/sign-in' />;
            }
          }}
        >
          <Text className='font-rubik-semibold text-2xl text-danger text-right mt-10'>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
