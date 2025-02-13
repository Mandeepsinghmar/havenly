import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';

import icons from '@/constants/icons';

const SearchBar = () => {
  return (
    <View className='flex-row items-center justify-between bg-gray-200 px-4 py-3 rounded-lg'>
      <View className='flex-row items-center gap-2'>
        <Image source={icons.search} className='w-5 h-5' />
        <TextInput
          placeholder='Search something'
          className='ml-2 text-base text-gray-700'
          placeholderTextColor='#888'
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className='w-5 h-5' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
