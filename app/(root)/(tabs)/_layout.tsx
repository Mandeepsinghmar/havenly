import { View, Text, ImageSourcePropType, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          minHeight: 80,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#0061FF1A',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={'Home'} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={'Explore'} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={'Profile'} icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

function TabIcon({
  icon,
  title,
  focused,
}: {
  icon: ImageSourcePropType;
  title: string;
  focused: boolean;
}) {
  return (
    <View className='flex-1 mt-3 flex flex-col items-center'>
      <Image
        source={icon}
        tintColor={focused ? '#0061FF' : '#666876'}
        resizeMode='contain'
        className='size-6'
      />
      <Text
        className={`${
          focused
            ? 'text-primary-100 font-rubik-medium'
            : 'text-black-200 font-rubik'
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
}
