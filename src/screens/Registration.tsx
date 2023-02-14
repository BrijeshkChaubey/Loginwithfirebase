import React, {useState} from 'react';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


import {TextInput} from 'react-native-paper';
import {auth} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Registration = ({navigation}: any) => {
  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [pass, setPass] = useState<String>('');
  const [confirmpass, setConfirmPass] = useState<String>('');
  const [nameValid, setNameValid] = useState<Boolean>(false);
  const [emailValid, setEmailValid] = useState<Boolean>(false);
  const [passValid, setPassValid] = useState<Boolean>(false);
  const [confirmValid, setConfirmValid] = useState<Boolean>(false);


  const handleName = (value: any) => {
    setName(value);
    if (value.length === 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (text.length === 0) {
      setEmailValid(false);
    } else if (re.test(text) || regex.test(text)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const handlePass = (value: any) => {
    setPass(value);
    if (value.length === 0) {
      setPassValid(true);
    } else if (value.length < 8 || value.length > 20) {
      setPassValid(true);
    } else {
      setPassValid(false);
    }
  };

  const handleConfirmPass: any = (value: any) => {
    setConfirmPass(value);
    if (value.length === 0) {
      setConfirmValid(true);
    } else {
      setConfirmValid(false);
    }
  };

  const handleSignUp: any = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user);
        Alert.alert('Registered, please login');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    if (name.length === 0) {
      Alert.alert('Name can not be empty');
    } else if (email.length === 0) {
      Alert.alert('Email can not be empty');
    } else if (pass.length === 0) {
      Alert.alert('Password should be min 8 characters and max 20 characters');
    } else if (pass !== confirmpass) {
      Alert.alert('Password and confirm password should be same');
    } 
     else {
      handleSignUp();
    }
  };

  return (
      <View style={styles.root}>
         
            <View>
              <TextInput
                style={{marginTop: 8}}
                label="Name"
                value={name}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={handleName}
              />
              {nameValid ? (
                <Text style={styles.textFailed}>Name can't be empty</Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}

              <TextInput
                style={{marginTop: 10}}
                label="Email"
                value={email}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={handleCheckEmail}
              />
              {emailValid ? (
                <Text style={styles.textFailed}>Wrong format email</Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}
              <TextInput
                style={{marginTop: 10}}
                label="Password"
                value={pass}
                mode="outlined"
                onChangeText={handlePass}
              />
              {passValid ? (
                <Text style={styles.textFailed}>
                  Password can't be too short
                </Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}

              <TextInput
                style={{marginTop: 10}}
                label="Confirm Password"
                value={confirmpass}
                mode="outlined"
                onChangeText={handleConfirmPass}
              />
              {confirmValid ? (
                <Text style={styles.textFailed}>
                  Confirm password can't be matched
                </Text>
              ) : (
                <Text style={styles.textFailed} />
              )}
            </View>

            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Register</Text>
              </View>
            </TouchableOpacity>
      </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: 'rgb(58, 58, 60)',
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    width: 80,
  },
  root: {
    backgroundColor: 'pink',
    flex: 1,
  },
   textButton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  textInput: {
    color: '#FFFFFF',
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  text: { 
    color: 'white',
    fontWeight: '700',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});
