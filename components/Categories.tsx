import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

interface CategoriesProps {
  name: string;
  isActive?: boolean;
  onPress?: () => void;
}

const Categories: React.FC<CategoriesProps> = ({
  name,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`px-5 py-2 rounded-full flex-row items-center border border-primary-200 ${
          isActive ? 'bg-primary-100' : 'bg-primay-300'
        }`}
      >
        <Text
          className={`text-sm  ${
            isActive ? 'text-white font-semibold' : 'text-black font-rubik'
          }`}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Categories;
