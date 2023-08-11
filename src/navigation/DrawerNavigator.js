// import {ContactStackNavigator} from './StackNavigator';
import React from 'react';
import TabNavigator from './TabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeScr" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
