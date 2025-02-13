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
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  location,
  price,
  rating,
  category,
  id,
}) => {
  return (
    <TouchableOpacity className='flex flex-col items-center gap-4 '>
      <View className='bg-white rounded-xl flex flex-1 px-3 py-5 shadow-lg shadow-zinc-100 '>
        <Link href={`property/:${id}`}>
          <ImageBackground
            source={image}
            className=' rounded-lg overflow-hidden w-[300px] h-[300px]'
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

import { Models } from 'react-native-appwrite';

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex flex-col items-start w-60 h-80 relative'
    >
      <Image source={{ uri: item.image }} className='size-full rounded-2xl' />

      <Image
        source={images.cardGradient}
        className='size-full rounded-2xl absolute bottom-0'
      />

      <View className='flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5'>
        <Image source={icons.star} className='size-3.5' />
        <Text className='text-xs font-rubik-bold text-primary-100 ml-1'>
          {item.rating}
        </Text>
      </View>

      <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
        <Text
          className='text-xl font-rubik-extrabold text-white'
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className='text-base font-rubik text-white' numberOfLines={1}>
          {item.address}
        </Text>

        <View className='flex flex-row items-center justify-between w-full'>
          <Text className='text-xl font-rubik-extrabold text-white'>
            ${item.price}
          </Text>
          <Image source={icons.heart} className='size-5' />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SearchCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'
      onPress={onPress}
    >
      <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50'>
        <Image source={icons.star} className='size-2.5' />
        <Text className='text-xs font-rubik-bold text-primary-100 ml-0.5'>
          {item.rating}
        </Text>
      </View>

      <Image source={item.image} className='w-full h-40 rounded-lg' />

      <View className='flex flex-col mt-2'>
        <Text className='text-base font-rubik-bold text-black-300'>
          {item.name}
        </Text>
        <Text className='text-xs font-rubik text-black-300'>
          {item.address}
        </Text>

        <View className='flex flex-row items-center justify-between mt-2'>
          <Text className='text-base font-rubik-bold text-primary-100'>
            ${item.price}
          </Text>
          <Image
            source={icons.heart}
            className='w-5 h-5 mr-2'
            tintColor='#191D31'
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
