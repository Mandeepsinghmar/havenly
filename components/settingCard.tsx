import { View, Text, Image } from 'react-native';
import React from 'react';

import icons from '@/constants/icons';

interface SettingCardProps {
  title: string;
  icon: number;
}

const SettingCard: React.FC<SettingCardProps> = ({ title, icon }) => {
  return (
    <View className='flex flex-row justify-between items-center'>
      <View className='flex flex-row gap-3 items-center'>
        <Image source={icon} className='w-7 h-7' resizeMode='contain' />
        <Text className='font-rubik-medium text-lg text-black-300'>
          {title}
        </Text>
      </View>
      <Image
        source={icons.rightArrow}
        className='w-5 h-5'
        resizeMode='contain'
      />
    </View>
  );
};

export default SettingCard;
