import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AutoHeightImage from 'react-native-auto-height-image';

const HomeScreen = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Current page number
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      fetchAPI();
    }
  }, [isFetch]);

  const fetchAPI = async () => {
    try {
      const url = 'http://dev3.xicom.us/xttest/getdata.php'; 
      const formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', page);
      formData.append('type', 'popular');
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      setData(data.concat(responseData?.images));
      //   setPage(e => e + 1);
      if (responseData?.images?.length < 10) {
        setIsFetch(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (isFetch) {
      setPage(p => p + 1);
      fetchAPI();
      //   alert(page);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{alignItems: 'center'}}
          onPress={() =>
            props.navigation.navigate('HomeDetail', {
              id: item?.id,
              image: item?.xt_image,
            })
          }>
          <AutoHeightImage width={385} source={{uri: item?.xt_image}} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
        />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={({item, index}) =>
              `${item?.xt_image}${item?.id}${index}`
            }
            // onEndReached={fetchAPI}
            // onEndReachedThreshold={0.1}
            ListHeaderComponent={
              <View style={{marginVertical: 10, alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 15}}>
                  Image Listing
                </Text>
              </View>
            }
            ListFooterComponent={
              <View
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}} onPress={loadMore}>
                  Click here to load more
                </Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
