import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';

import icons from '@/constants/icons';

const SearchBar = () => {
  return (
    <View className=' relative  bg-accent-100 border  h-[52px] mt-4 border-gray-100 px-4 py-3 rounded-lg'>
      <View className='flex-row items-center gap-3'>
        <Image source={icons.search} className='w-5 h-5' />
        <TextInput
          placeholder='Search something'
          className='py-2 text-gray-700 w-full pr-16 overflow-scroll'
          placeholderTextColor='#888'
        />
      </View>
      <TouchableOpacity className='absolute right-3 top-4'>
        <Image source={icons.filter} className='w-5 h-5' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
