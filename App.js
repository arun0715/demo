import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';
import Images from './src/utils/images'

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

import {
  // Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icons from './src/utils/images';

const App = () => {
  const [tab, setTab] = useState('watched');
  const [data, setData] = useState([]);
  const [extraData, setExtraData] = useState(true);
  const [watched, setWatched] = useState([]);
  const [str, setStr] = useState('');
  useEffect(() => {
    getWatchedMovies();

    return () => {
    }
  }, [])

  const getMovies = async () => {
    try {
      console.log(`https://api.themoviedb.org/3/search/tv?api_key=c993248940ba3a11d07abe3dac8ce417&language=en-US&page=1&include_adult=false&query=${str}`)
      let response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=c993248940ba3a11d07abe3dac8ce417&language=en-US&page=1&include_adult=false&query=${str}`,
      );
      let json = await response.json();
      console.log('object', json);
      setData(json.results || []);
    } catch (error) { }
    setStr('');
  };

  const getWatchedMovies = async () => {
    try {
      let temp = await AsyncStorage.getItem('watched');
      if (temp) {
        setWatched(JSON.parse(temp))
      }
    } catch (error) { }
    setStr('');
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ flexDirection: 'row', height: 50, marginHorizontal: 20 }}>
          <View
            style={{
              flex: 5,
              borderWidth: 1,
              flexDirection: 'row',
              borderColor: "grey",
              padding: 10,
            }}>
            <Image style={{ padding: 10, marginRight: 10 }} source={Icons.search}></Image>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Search movie"
              onChangeText={(_) => setStr(_)}
              value={str}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              getMovies();
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "blue",
            }}>
            <Text style={{ color: 'white', fontSize: 26 }}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 5 }}>
          <TextInput />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '80%',

            paddingHorizontal: 30,
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              setTab('Unwatched');
            }}
            style={[styles.tab, tab == 'Unwatched' && { borderBottomWidth: 1, borderBottomColor: "#3333cc" }]}>
            <Image style={[styles.tab, tab == 'Unwatched' && { tintColor: '#3333cc', }]} source={Images.offEye} />
            <Text style={[styles.tab, tab == 'Unwatched' && { color: '#3333cc', }]}>Unwatched</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTab('watched');
            }}
            style={[styles.tab, tab == 'watched' && { borderBottomWidth: 1, borderBottomColor: "#3333cc" }]}>
            <Image style={[styles.tab, tab == 'watched' && { tintColor: '#3333cc', }]} source={Images.onEye} />

            <Text style={[styles.tab, tab == 'watched' && { color: '#3333cc', }]}>Watched</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tab == 'watched' ? watched : data}

          renderItem={({ item }) => {
            if (tab != 'watched' && watched.some(_ => _.id == item.id)) {
              return null;
            }
            return (
              <List>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={Icons.imagaback} />
                  </Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note numberOfLines={1}>
                      {item.overview}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      onPress={async () => {
                        // REMOVING
                        if (tab == 'watched') {
                          let temp = await AsyncStorage.getItem('watched');
                          if (temp) {
                            temp = JSON.parse(temp);
                            temp = temp.filter((_) => _.id != item.id);
                            AsyncStorage.setItem('watched', JSON.stringify(temp));
                            setWatched(temp);
                          }
                        } else {
                          watched.push(item);
                          AsyncStorage.setItem(
                            'watched',
                            JSON.stringify(watched),
                          );
                          setWatched(watched);
                        }
                        setExtraData(!extraData)
                      }}
                      transparent>
                      <Image style={{ padding: 10, marginRight: 10 }} source={(tab == 'watched') ? Icons.remove : Icons.add}></Image>
                      <Text>{(tab == 'watched') ? 'Watched' : 'Unwatch'}</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            )
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No Movies List found</Text>
            </View>
          }
          extraData={extraData}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  tab: {
    borderBottomWidth: 0,
    // flex: 1
    padding: 5,
    // justifyContent: 'center',
    alignSelf: 'center',
    // alignContent: 'center',
    marginLeft: 5,
  },








});

export default App;
