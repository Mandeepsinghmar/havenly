import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import { Link } from 'expo-router';

type CardProps = {
  title: string;
  location: string;
  price: string;
  rating: number;
  image: any; // Adjust if using a specific image type like `ImageSourcePropType`
  category: string;
  id: number;
  width?: string;
  height?: string;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  location,
  price,
  rating,
  category,
  id,
  width,
  height,
}) => {
  return (
    <TouchableOpacity className='flex flex-col items-center gap-4 '>
      <View className='bg-white rounded-xl flex flex-1 px-3 py-5 shadow-lg shadow-zinc-100 '>
        <Link href={`property/:${id}`}>
          <ImageBackground
            source={image}
            className={`rounded-lg overflow-hidden ${
              width ? `${width}` : 'w-[300px]'
            } ${height ? `${height}` : 'h-[340px]'}`}
          >
            <View className='absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex-row items-center'>
              <Image source={icons.star} className='w-4 h-4 mr-1' />
              <Text className='text-black text-sm font-semibold'>{rating}</Text>
            </View>
          </ImageBackground>
        </Link>

        <View className='mt-4'>
          <Link href={`property/:${id}`}>
            <Text className='text-black-300 text-xl font-rubik-bold mb-3'>
              {title}
            </Text>
          </Link>
          <Text className='text-black-100 text-sm'>{location}</Text>
          <View className='flex-row justify-between items-center'>
            <Text className='text-primary-100 text-xl font-rubik-bold mt-1'>
              {price}
            </Text>
            <TouchableOpacity>
              <Image source={icons.grayHeart} className='w-6 h-6' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
