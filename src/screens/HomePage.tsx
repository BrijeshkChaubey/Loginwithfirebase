/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {User} from '../components/User';
import {ActivityIndicator} from 'react-native-paper';



const HomePage = ({navigation}: any) => {

  const [data, setData] = useState<User[]>([]);
  const [loader, setLoader] = useState<Boolean>(true);
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details Page', {
          id: item.id,
        })
      }>
      <View style={styles.alignment}>
        <Text style={styles.TextTitle}>{item.title}</Text>
        <View style={styles.customView}></View>
        <Text style={styles.bodyText}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  const fetchData: any = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
    setLoader(false);
    const result = await resp.json();

    console.log(result);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loader) {
    return <ActivityIndicator animating={true} color="blue" />;
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
       <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomePage;

const styles= StyleSheet.create({


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
    backgroundColor: 'black',
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
  alignment: {
    alignItems: 'center',
    fontSize: 18,
    borderRadius: 5,
    paddingVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    backgroundColor: 'white',
  },
  TextTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  customView: {
    width: '120%',
    height: 2,
    backgroundColor: 'black',
  },
  bodyText: {
    paddingVertical: 10,
    fontSize: 12,
  },
});
