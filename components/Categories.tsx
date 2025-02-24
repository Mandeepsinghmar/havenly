import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

interface CategoriesProps {
  name: string;
  isActive?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({ name, isActive = false }) => {
  // const params = useLocalSearchParams<{ filter?: string }>();
  // const [selectedCategory, setSelectedCategory] = useState(
  //   params.filter || 'All'
  // );

  // const handleCategoryPress = (category: string) => {
  //   if (selectedCategory === category) {
  //     setSelectedCategory('');
  //     router.setParams({ filter: '' });
  //     return;
  //   }

  //   setSelectedCategory(category);
  //   router.setParams({ filter: category });
  // };

  return (
    <TouchableOpacity>
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
