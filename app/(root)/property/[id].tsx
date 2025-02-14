import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import { gallery } from '@/constants/data';

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className=' h-full bg-white '>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={images.japan} className={' w-full h-[460px]'}>
          <SafeAreaView className='flex flex-row justify-between items-center mb-4 px-4 py-2'>
            <TouchableOpacity
              onPress={() => router.push('/')}
              className='rounded-full bg-primary-300 p-3'
            >
              <Image
                source={icons.backArrow}
                className='w-6 h-6'
                resizeMode='contain'
                tintColor={'#fff'}
              />
            </TouchableOpacity>

            <View className=' flex-row items-center gap-4'>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className='rounded-full bg-primary-300 p-3'
              >
                <Image
                  source={icons.whiteHeart}
                  className='w-6 h-6'
                  resizeMode='contain'
                  tintColor={'#fff'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/')}
                className='rounded-full bg-primary-300 p-3'
              >
                <Image
                  source={icons.send}
                  className='w-6 h-6'
                  resizeMode='contain'
                  tintColor={'#fff'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
        <SafeAreaView className='px-4 '>
          <Text className='text-black-300 font-rubik-semibold text-xl mb-4'>
            Gallery
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName=' gap-4'
          >
            {gallery.map((data, i) => (
              <Image
                key={data.id}
                source={data.image}
                className='w-[118px] h-[118px] rounded-xl'
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Property;
