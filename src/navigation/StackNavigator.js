import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from '../screens/SignUp/SignUp';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {MainStackNavigator};
