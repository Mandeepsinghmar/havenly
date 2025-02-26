import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search something',
  onFilterPress,
}: SearchBarProps) => {
  return (
    <View className='flex-row items-center bg-accent-100 border h-[52px] mt-4 border-gray-100 rounded-lg px-4 py-2'>
      <View className='flex-row items-center flex-1'>
        <Image source={icons.search} className='w-5 h-5 mr-2' />
        <TextInput
          className='flex-1 h-10'
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          returnKeyType='search'
          clearButtonMode='while-editing'
        />
      </View>
      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress}>
          <Image source={icons.filter} className='w-5 h-5 ml-2' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
