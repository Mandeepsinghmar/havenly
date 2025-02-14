import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cards, categories } from '@/constants/data';
import SearchBar from '@/components/SearchBar';
import icons from '@/constants/icons';
import Card from '@/components/Card';
import { router } from 'expo-router';
import Categories from '@/components/Categories';

const Explore = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={cards}
        contentContainerClassName='px-5 gap-6 pb-28'
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            category={item.category}
            rating={item.rating}
            location={item.location}
            id={item.id}
          />
        )}
        ListHeaderComponent={
          <View className='mt-4'>
            <View className='flex flex-row justify-between items-center mb-4'>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className='rounded-full bg-primary-300 p-2'
              >
                <Image
                  source={icons.backArrow}
                  className='w-6 h-6'
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <Text className='text-black-300 font-rubik-medium text-base'>
                Search for Your Ideal Home
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
            <SearchBar />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName='mt-6 gap-4'
            >
              {categories.map((data, i) => (
                <Categories
                  key={i}
                  name={data.category}
                  isActive={false}
                  onPress={() => {}}
                />
              ))}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
