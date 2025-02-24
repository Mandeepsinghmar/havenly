import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logout } from '@/lib/appwrite';
import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import SettingCard from '@/components/settingCard';
import { useGlobalContext } from '@/lib/global-provider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'Logged out successfully');
      setUser(null);
      router.replace('/sign-in');
    } else {
      Alert.alert('Error', 'Failed to logout');
    }
  };
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

        <TouchableOpacity onPress={handleLogout} className='mt-6 '>
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
