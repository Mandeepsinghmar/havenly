import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cards, categories } from '@/constants/data';
import SearchBar from '@/components/SearchBar';
import icons from '@/constants/icons';
import Card from '@/components/Card';
import { router } from 'expo-router';
import Categories from '@/components/Categories';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filteredCards = cards.filter((card) => {
    const matchesSearch = searchQuery
      ? card.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : card.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={filteredCards}
        contentContainerClassName='px-5 gap-6 pb-28'
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        numColumns={2}
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
        ListEmptyComponent={
          <View className='flex items-center justify-center mt-10'>
            <Text className='text-black-300 font-rubik-medium text-base'>
              No results found
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View className='mt-4'>
            <View className='flex flex-row justify-between items-center mb-4'>
              <TouchableOpacity
                onPress={() => router.push('/')}
                className='rounded-full bg-primary-300 p-3'
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
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName='mt-6 gap-4'
            >
              {categories.map((data, i) => (
                <Categories
                  key={i}
                  name={data.category}
                  isActive={selectedCategory === data.category}
                  onPress={() => setSelectedCategory(data.category)}
                />
              ))}
            </ScrollView>
            <Text className='text-black-300 font-rubik-semibold text-xl mt-8'>
              Found {filteredCards.length} results
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
