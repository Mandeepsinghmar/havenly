import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cards } from '@/constants/data';
import SearchBar from '@/components/SearchBar';
import icons from '@/constants/icons';
import Card from '@/components/Card';

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
          <View>
            <View className='flex flex-row justify-between mb-4'>
              <Image
                source={icons.backArrow}
                className='w-6 h-6'
                resizeMode='contain'
              />
              <Text className='text-black-300 font-rubik-bold text-base'>
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
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
