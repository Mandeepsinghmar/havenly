import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

type FeaturedCardProps = {
  title: string;
  location: string;
  price: string;
  rating: number;
  image: any; // Adjust if using a specific image type like `ImageSourcePropType`
  category: string;
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  image,
  title,
  location,
  price,
  rating,
  category,
}) => {
  return (
    <View>
      <ImageBackground
        source={image}
        className='w-[250px] h-[340px] rounded-2xl overflow-hidden relative mt-6'
      >
        {/* Top Right - Rating */}
        <View className='absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex-row items-center'>
          <Image source={icons.star} className='w-4 h-4 mr-1' />
          <Text className='text-black text-sm font-semibold'>{rating}</Text>
        </View>

        {/* Bottom Section */}
        <View className='absolute bottom-3 left-3'>
          <Text className='text-white text-xl font-rubik-bold'>{title}</Text>
          <Text className='text-gray-200 text-base'>{location}</Text>
          <Text className='text-white text-xl font-rubik-bold mt-1'>
            {price}
          </Text>
        </View>

        {/* Bottom Right - Heart Icon */}
        <TouchableOpacity className='absolute bottom-3 right-3'>
          <Image source={icons.whiteHeart} className='w-6 h-6' />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default FeaturedCard;
