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

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert('Invalid email format');
    } else if (!validatePassword(password)) {
      alert(passwordError);
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  const userLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(JSON.stringify(res));
        Alert.alert('User Logged In');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }

    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      setPasswordError('Password must contain at least 1 uppercase letter');
      return false;
    }

    const numberRegex = /[0-9]/;
    if (!numberRegex.test(password)) {
      setPasswordError('Password must contain at least 1 number');
      return false;
    }

    setPasswordError('');
    return true;
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
        onPress={userLogin}>
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
