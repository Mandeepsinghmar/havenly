import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { getUserInfo } from '@/auth/appwrite';
import Topbar from '@/components/Topbar';
import FeaturedCard from '@/components/FeaturedCard';
import OurRecommendation from '@/components/OurRecommendation';
import { categories, featuredCards } from '@/constants/data';
import Categories from '@/components/Categories';

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

  return (
    <SafeAreaView className=' px-5 py-3  '>
      <ScrollView>
        <Topbar avatar={user?.avatar} name={user?.name} />
        <SearchBar />
        <View className='flex flex-row justify-between mt-6'>
          <Text className='font-rubik-semibold text-xl text-black-300 '>
            Featured
          </Text>
          <Text className='font-rubik-semibold text-base text-primary-100 '>
            See All
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName='gap-4'
        >
          {featuredCards.map((data, i) => (
            <FeaturedCard
              key={i}
              title={data.title}
              image={data.image}
              price={data.price}
              category={data.category}
              rating={data.rating}
              location={data.location}
            />
          ))}
        </ScrollView>
        <View className='flex flex-row justify-between mt-6'>
          <Text className='font-rubik-semibold text-xl text-black-300 '>
            Our Recommendation
          </Text>
          <Text className='font-rubik-semibold text-base text-primary-100 '>
            See All
          </Text>
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

        <OurRecommendation />

        <View className='mt-20'>
          <Link href='/explore'>Explore</Link>
          <Link href='/profile'>Profile</Link>
          <Link href='/sign-in'>Sign In</Link>
          <Link href='/property/:1'>Property</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
