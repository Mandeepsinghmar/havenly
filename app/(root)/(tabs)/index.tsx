import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserInfo } from '@/auth/appwrite';
import Topbar from '@/components/Topbar';
import FeaturedCard from '@/components/FeaturedCard';
import { cards, categories, featuredCards } from '@/constants/data';
import Categories from '@/components/Categories';
import Card from '@/components/Card';

const Index = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = async () => {
      const result = await getUserInfo();
      console.log(result);
      setUser(result);
    };
    userInfo();
  }, []);
  if (!user) {
    return <Redirect href='/sign-in' />;
  }
  return (
    <SafeAreaView className=' h-full bg-white '>
      <FlatList
        data={cards}
        numColumns={2}
        refreshing={false}
        onRefresh={() => {}}
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
        // keyExtractor={(item) => item.id}
        contentContainerClassName='pb-32 gap-4'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          true ? (
            <ActivityIndicator size='large' className='text-primary-300 mt-5' />
          ) : (
            <View>
              <Text className='text-center font-rubik-bold text-xl'>
                No results
              </Text>
            </View>
          )
        }
        ListHeaderComponent={() => (
          <View className='px-5'>
            <Topbar avatar={user?.avatar} name={user?.name} />

            <SearchBar />

            <View className='my-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className='text-base font-rubik-bold text-primary-100'>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {false ? (
                <ActivityIndicator size='large' className='text-primary-300' />
              ) : cards.length === 0 ? (
                <View>
                  <Text>No results</Text>
                </View>
              ) : (
                <FlatList
                  data={featuredCards}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      // id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      category={item.category}
                      rating={item.rating}
                      location={item.location}
                      // item={item}
                      // onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  ListEmptyComponent={() =>
                    false ? (
                      <ActivityIndicator size='large' />
                    ) : (
                      <View className='w-full flex my-5 items-center'>
                        <Text className=' font-rubik-bold text-xl'>
                          No results
                        </Text>
                      </View>
                    )
                  }
                  // keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName='flex gap-5 mt-5'
                />
              )}
            </View>

            {/* <Button title="seed" onPress={seed} /> */}

            <View className='mt-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-xl font-rubik-bold text-black-300'>
                  Our Recommendation
                </Text>
                <TouchableOpacity>
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
                    isActive={false}
                    onPress={() => {}}
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
