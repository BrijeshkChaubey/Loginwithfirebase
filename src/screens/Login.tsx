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

import SizedBox from '../components/Sizebox';

import {TextInput} from 'react-native-paper';
import {auth} from '../../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';



const Login: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState<String>('');
  const [pass, setPass] = useState<String>('');
  const [seePassword, setSeePassword] = useState<Boolean>(false);
  const [checkValidEmail, setCheckValidEmail] = useState<Boolean>(false);


  const siginIn: any = () => {
    try {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userDetails: any) => {
          console.log(userDetails);
          navigation.navigate('Home Page');
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Email not matched');
        });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmit: any = () => {
    const checkPassowrd = checkPasswordValidity(pass);
    if (email.length === 0) {
      Alert.alert('email can not be empty');
    } else {
      if (!checkPassowrd) {
        siginIn();
      } else {
        Alert.alert(checkPassowrd);
      }
    }
  };

  const checkPasswordValidity: any = (value: any) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    return null;
  };

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (text.length === 0) {
      setCheckValidEmail(false);
    }
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handlePass = (value: any) => {
    setPass(value);
    if (value.length < 8) {
      setSeePassword(true);
    } else {
      setSeePassword(false);
    }
  };

  return (
      <View style={styles.root}>
          
            <View style={styles.alignment}>
              <TextInput
                style={{marginTop: 10}}
                label="Email"
                value={email}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={handleCheckEmail}
              />
              {checkValidEmail ? (
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
              {seePassword ? (
                <Text style={styles.textFailed}>
                  Password can't be too short
                </Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}
            </View>

            <SizedBox height={20} />
            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Log in</Text>
              </View>
            </TouchableOpacity>
            <SizedBox height={16} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration Page')}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.buttonTitle}>New User? Register Here</Text>
              </View>
            </TouchableOpacity>
      </View>
  );
};

export default Login;

const styles=StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: 'red',
      borderRadius: 8,
      height: 38,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 22,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
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
    safeAreaView: {
      flex: 1,
    },
    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
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

