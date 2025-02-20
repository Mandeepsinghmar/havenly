import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import { facilities, gallery } from '@/constants/data';

const { width } = Dimensions.get('window');

const Property = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll(event: {
    nativeEvent: { contentOffset: { x: number } };
  }) {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  }

  return (
    <View className=' bg-white '>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View className='relative'>
          <FlatList
            data={gallery}
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            // onMomentumScrollEnd={(event) => {
            //   const index = Math.round(
            //     event.nativeEvent.contentOffset.x / width
            //   );
            //   setActiveIndex(index);
            // }}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width }}>
                <ImageBackground
                  source={item.image}
                  className={' w-full h-[460px] mb-0'}
                />
              </View>
            )}
          />
          {/* <SafeAreaView className='flex flex-row justify-between items-center px-4 py-2 '> */}
          <SafeAreaView className='absolute top-4 left-0 right-0 flex-row justify-between px-4 py-2'>
            <TouchableOpacity
              onPress={() => router.back()}
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
              <TouchableOpacity className='rounded-full bg-primary-300 p-3'>
                <Image
                  source={icons.whiteHeart}
                  className='w-6 h-6'
                  resizeMode='contain'
                  tintColor={'#fff'}
                />
              </TouchableOpacity>

              <TouchableOpacity className='rounded-full bg-primary-300 p-3'>
                <Image
                  source={icons.send}
                  className='w-6 h-6'
                  resizeMode='contain'
                  tintColor={'#fff'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View className='absolute bottom-4 left-1/2 -translate-x-1/2 flex-row gap-2'>
            {gallery.map((item, index) => (
              <TouchableOpacity key={index}>
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <SafeAreaView className='px-4 -mt-10 '>
          {/* topbar  */}
          <View className='mb-8  w-full border-b pb-8 border-gray-100 '>
            <Text className='text-2xl mb-1 font-rubik-bold text-black-300'>
              Modernica Apartment
            </Text>

            <View className='flex-row items-center gap-4 mt-1 mb-2'>
              <View className='bg-primary-200 px-2 py-1 rounded-xl'>
                <Text className='text-xs font-rubik-semibold text-primary-100'>
                  APARTMENT
                </Text>
              </View>
              <View className='flex-row items-center '>
                <Image source={icons.star} className='w-4 h-4 mr-1' />

                <Text className='text-gray-600 text-sm'>
                  4.8 <Text className='text-gray-400'>(1,275 reviews)</Text>
                </Text>
              </View>
            </View>

            <View className='flex-row justify-between mt-2'>
              <View className='flex-row items-center gap-2'>
                <View className='rounded-full bg-primary-300 p-3'>
                  <Image source={icons.bed} className='w-5 h-5' />
                </View>
                <Text className='font-rubik-medium text-black-300 text-sm'>
                  8 Beds
                </Text>
              </View>

              <View className='flex-row items-center gap-2'>
                <View className='rounded-full bg-primary-300 p-3'>
                  <Image source={icons.bath} className='w-5 h-5' />
                </View>
                <Text className='font-rubik-medium text-black-300 text-sm'>
                  3 Bath
                </Text>
              </View>

              <View className='flex-row items-center gap-2'>
                <View className='rounded-full bg-primary-300 p-3'>
                  <Image source={icons.swim} className='w-5 h-5' />
                </View>
                <Text className='font-rubik-medium text-black-300 text-sm'>
                  2000 sqft
                </Text>
              </View>
            </View>
          </View>
          {/* profile  */}
          <View className='mb-8'>
            <Text className='text-black-300 font-rubik-semibold text-xl mb-2'>
              Agent
            </Text>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <Image
                  source={images.avatar}
                  className='w-12 h-12 rounded-full'
                />
                <View>
                  <Text className='text-base font-semibold text-gray-900'>
                    Natasya Wilodra
                  </Text>
                  <Text className='text-gray-500 text-sm'>Owner</Text>
                </View>
              </View>

              {/* Contact Icons */}
              <View className='flex-row gap-5'>
                <TouchableOpacity>
                  <Image
                    source={icons.chat}
                    className='w-7 h-7'
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={icons.phone}
                    className='w-7 h-7'
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className='mb-8'>
            {/* Overview Section */}
            <Text className='text-black-300 font-rubik-semibold text-xl  mb-2'>
              Overview
            </Text>
            <Text className='text-black-100 font-rubik-regular text-base leading-7'>
              Sleek, modern 2-bedroom apartment with open living space, high-end
              finishes, and city views. Minutes from downtown, dining, and
              transit.
            </Text>
          </View>

          <FacilitiesCard />

          <Gallery />
          <LocationCard />
          <ReviewCard />
        </SafeAreaView>
        <Pricing />
      </ScrollView>
    </View>
  );
};
export default Property;

function Gallery() {
  return (
    <View className='mb-8 '>
      <Text className='text-black-300 font-rubik-semibold text-xl mb-4'>
        Gallery
      </Text>
      <FlatList
        data={gallery.slice(0, 3)}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View className='relative mr-3'>
            <Image source={item.image} className='w-32 h-32 rounded-lg' />
            {index === 2 && gallery.length > 3 && (
              <View className='absolute top-0 left-0 w-full h-full bg-black-300/50 rounded-lg flex items-center justify-center'>
                <Text className='text-white font-rubik-bold text-xl'>
                  {gallery.length - 3}+
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const truncateText = (text: string) => {
  return text.length > 8 ? text.substring(0, 8) + '...' : text;
};

function FacilitiesCard() {
  return (
    <View className='mb-8 w-full'>
      <Text className='text-black-300 font-rubik-semibold text-xl mb-4'>
        Facilities
      </Text>
      <View className='flex-row flex-wrap justify-between'>
        {facilities.map((item, index) => (
          <View key={index} className='w-1/4 items-center mb-5'>
            <TouchableOpacity className='w-16 h-16 flex-row items-center justify-center rounded-full bg-primary-200'>
              <Image source={item.icon} className='w-7 h-7' />
            </TouchableOpacity>
            <Text className='text-gray-700 text-sm text-center mt-1'>
              {truncateText(item.title)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const LocationCard = () => {
  return (
    <View className='bg-white mb-8 rounded-lg '>
      <Text className='text-black-300 font-rubik-semibold text-xl mb-5'>
        Location
      </Text>
      <View className='flex-row items-center mb-5'>
        <Image source={icons.location} className='w-5 h-5' />

        <Text className='text-sm font-rubik-medium ml-2 text-black-200'>
          Grand City St. 100, New York, United States
        </Text>
      </View>

      <View className='relative rounded-lg overflow-hidden'>
        <Image source={images.map} className='w-full h-40 rounded-lg' />
      </View>
    </View>
  );
};

const ReviewCard = () => {
  return (
    <View className='bg-white '>
      {/* Header - Rating and See All */}
      <View className='flex-row justify-between items-center mb-3'>
        <View className='flex-row items-center'>
          <Image source={icons.star} className='w-6 h-6 mr-1' />

          <Text className='text-xl font-rubik-semibold text-black-300 ml-1'>
            4.8 (1,275 reviews)
          </Text>
        </View>
        <Text className='text-primary-100 font-rubik-semibold text-base'>
          See All
        </Text>
      </View>

      {/* User Info */}
      <View className='flex-row items-center mb-3 gap-3'>
        <Image source={images.avatar} className='w-10 h-10 rounded-full' />
        <Text className='text-base font-semibold text-black-300'>
          Mandeep Hanlin
        </Text>
      </View>

      {/* Review Text */}
      <Text className='text-black-200 text-lbase font-rubik-regular mb-3 leading-7'>
        The apartment is very clean and modern. I really like the interior
        design. Looks like I'll feel at home 🥰
      </Text>

      {/* Likes and Date */}
      <View className='flex-row justify-between items-center mb-5'>
        <View className='flex-row items-center'>
          <Image
            source={icons.whiteHeart}
            className='w-5 h-5 rounded-full'
            tintColor={'#0061FF'}
          />

          <Text className='ml-2 text-black-300'>938</Text>
        </View>
        <Text className='text-black-100 font-rubik text-sm'>6 days ago</Text>
      </View>
    </View>
  );
};

function Pricing() {
  return (
    <View className=' border-t border-gray-100 py-6  rounded'>
      <View className='px-8 mb-8 flex-row items-center justify-between'>
        <View>
          <Text className='text-black-200 font-rubik-medium text-sm'>
            PRICE
          </Text>
          <Text className='text-2xl font-rubik-semibold text-primary-100'>
            $17821
          </Text>
        </View>
        <TouchableOpacity className='bg-primary-100 px-6 py-3 rounded-full'>
          <Text className='text-white font-rubik-semibold text-base'>
            Booking Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
