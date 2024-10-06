import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTrip } from './store/tripslice'; 
import { useRouter } from 'expo-router';
import { RootState } from './store/store';

const Trips = () => {
  const [newTrip, setNewTrip] = useState('');
  const trips = useSelector((state: RootState) => state.trips.trips);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddTrip = () => {
    if (newTrip.trim()) {
      dispatch(addTrip(newTrip));
      setNewTrip('');
    }
  };

  const handleNavigateToTrip = (tripName: string) => {
    router.push(`/trips/${tripName}`);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip location"
        placeholderTextColor="grey"
        value={newTrip}
        onChangeText={setNewTrip}
      />
      
      <TouchableOpacity onPress={handleAddTrip} style={styles.imageButton}>
        <Image
          source={require('./assets/images/button.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.container_trips}>
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tripCard} onPress={() => handleNavigateToTrip(item.name)}>
              <Text style={styles.tripName}>{item.name}</Text>
              <View> 
              <Image source={require('./assets/images/plane.png')} style={styles.image_walking}/>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFF0',
  },
  container_trips: {
    flex: 1,
    top: 30,
    right: 0,
    backgroundColor: '#FFFFF0',
    width: '100%',
  },

  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    position: 'absolute',
    top: 60,
    left: 30,
    width: '60%',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 30,
  },
  imageButton: {
    left: 130,
  },
  image: {
    width: 50,
    height: 50,
  },
  tripCard: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey', 
    height: 50,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image_walking:{
    position: 'absolute',
    left: 290,
    bottom: -12,
    backgroundColor: 'transparent', 
    height: 40,
    width: 40,
    zIndex: 10,

  },

});

export default Trips;
