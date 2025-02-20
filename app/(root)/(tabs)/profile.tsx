import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserInfo, logout } from '@/lib/appwrite';
import { Redirect } from 'expo-router';

import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import SettingCard from '@/components/settingCard';

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
    <SafeAreaView className=' bg-white h-full'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName=' px-5 pt-2'
      >
        <View className='flex flex-row justify-between'>
          <Text className='font-rubik-semibold text-lg text-black-300 '>
            Profile
          </Text>
          <View className='relative'>
            <Image
              source={icons.bell}
              className='w-6 h-6'
              resizeMode='contain'
            />
            <View className='rounded-full w-2 h-2 bg-primary-100 absolute top-0 right-1'></View>
          </View>
        </View>

        <View className='flex justify-center items-center gap-4'>
          <View className='relative'>
            <Image
              source={{
                uri: user?.avatar,
              }}
              className='w-36 h-36 rounded-full '
              resizeMode='contain'
            />
            <Image
              source={icons.edit}
              className='w-6 h-6 absolute bottom-1 right-3'
              resizeMode='contain'
            />
          </View>

          <Text className='font-rubik-semibold text-2xl'>{user?.name}</Text>
        </View>
        <View className='flex gap-6 mt-12'>
          {settings.map((setting, i) => (
            <SettingCard key={i} title={setting.title} icon={setting.icon} />
          ))}
        </View>

        <TouchableOpacity
          onPress={async () => {
            const msg = await logout();
            if (msg) {
              setShouldRedirect(true);
              return <Redirect href='/sign-in' />;
            }
          }}
          className='mt-6 '
        >
          <View className='flex flex-row items-center gap-2'>
            <Image
              source={icons.logout}
              className='w-7 h-7'
              resizeMode='contain'
            />

            <Text className='font-rubik-medium text-lg text-danger '>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
