import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

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
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className='mr-2'>
      <View
        className={`px-5 py-2 rounded-full flex-row items-center border ${
          isActive
            ? 'bg-primary-100 border-primary-100'
            : 'bg-white border-primary-200'
        }`}
      >
        <Text
          className={`text-sm ${
            isActive
              ? 'text-white font-rubik-semibold'
              : 'text-gray-800 font-rubik'
          }`}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Categories;
