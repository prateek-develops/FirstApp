import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import CustomCheckbox from '../../components/CustomCheckbox';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const LoginFun = () => {
    if (!email) {
      alert('Please enter your email.');
    } else if (!emailRegex.test(email)) {
      alert('Invalid email.');
    } else if (!password) {
      alert('Please enter your password.');
    } else if (!passwordRegex.test(password)) {
      alert('Password should be minimum 8 characters and 1 uppercase.');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(JSON.stringify(res));
          Alert.alert('User Logged In');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <CustomCheckbox
        label="I accept the terms & conditions"
        value={isChecked}
        onValueChange={setIsChecked}
      />
      <Text>Checkbox is {isChecked ? 'checked' : 'unchecked'}</Text>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.loginButton}
        disabled={!isChecked}
        onPress={LoginFun}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;
