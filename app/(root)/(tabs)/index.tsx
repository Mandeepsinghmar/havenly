import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '@/components/SearchBar';
import { getUserInfo } from '@/lib/appwrite';
import Topbar from '@/components/Topbar';
import FeaturedCard from '@/components/FeaturedCard';
import { cards, categories, featuredCards } from '@/constants/data';
import Categories from '@/components/Categories';
import Card from '@/components/Card';
import { User } from '@/lib/global-provider';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter recommended cards based on search and category
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getUserInfo();
        setUser(result);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await getUserInfo();
      setUser(result);
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
        numColumns={2}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName='pb-32 gap-4'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size='large' className='text-primary-300 mt-5' />
          ) : (
            <View className='flex items-center justify-center mt-10'>
              <Text className='text-center font-rubik-bold text-xl'>
                No results found
              </Text>
            </View>
          )
        }
        ListHeaderComponent={() => (
          <View className='px-5 mt-4'>
            <Topbar avatar={user?.avatar} name={user?.name} />

            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder='Search designs, styles, rooms...'
            />

            <View className='my-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Featured
                </Text>
                <TouchableOpacity onPress={() => router.push('/explore')}>
                  <Text className='text-base font-rubik-bold text-primary-100'>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <ActivityIndicator
                  size='large'
                  className='text-primary-300 mt-5'
                />
              ) : (
                <FlatList
                  data={featuredCards}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      category={item.category}
                      rating={item.rating}
                      location={item.location}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <View className='w-full flex my-5 items-center'>
                      <Text className='font-rubik-bold text-xl'>
                        No featured items
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName='flex gap-5 mt-5'
                />
              )}
            </View>

            <View className='mt-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Our Recommendation
                </Text>
                <TouchableOpacity onPress={() => router.push('/explore')}>
                  <Text className='text-base font-rubik-bold text-primary-100'>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

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
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Index;
