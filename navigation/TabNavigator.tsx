/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CreateScreen from '../screens/CreateScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MeScreen from '../screens/MeScreen';

import HomeIcon from '../assets/home.svg';
import DiscoverIcon from '../assets/search.svg';
import CreateIcon from '../assets/create.svg';
import CommunityIcon from '../assets/community.svg';
import MeIcon from '../assets/me.svg';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#0a9396',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {height: 72, paddingBottom: 10},
          tabBarIcon: ({focused, color, size}) => {
            let Icon;

            switch (route.name) {
              case 'Home':
                Icon = HomeIcon;
                break;
              case 'Discover':
                Icon = DiscoverIcon;
                break;
              case 'Create':
                Icon = CreateIcon;
                break;
              case 'Community':
                Icon = CommunityIcon;
                break;
              case 'Me':
                Icon = MeIcon;
                break;
              default:
                Icon = HomeIcon;
                break;
            }

            return <Icon width={size} height={size} fill={color} />;
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Me" component={MeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
