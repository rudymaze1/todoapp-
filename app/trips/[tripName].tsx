import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import { addActivity } from '../store/tripslice';
import { RootState } from '../store/store';

const TripDetail = () => {
  const { tripName } = useLocalSearchParams<{ tripName: string }>();
  const dispatch = useDispatch();

 
  const trip = useSelector((state: RootState) => 
    state.trips.trips.find(t => t.name.toLowerCase() === tripName?.toLowerCase())
  );

  const [newActivity, setNewActivity] = useState('');

  
  const handleAddActivity = () => {
    if (newActivity.trim()) {
      dispatch(addActivity({ tripName, activity: newActivity }));
      setNewActivity('');
    }
  };

 
  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Trip not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.name} Trip!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter activity"
        value={newActivity}
        onChangeText={setNewActivity}
      />
      <Button title="Add Activity" onPress={handleAddActivity} />

      <Text style={styles.subTitle}>Activities:</Text>

      <FlatList
        data={trip.activities || []} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.activity}>{item}</Text> 
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120, 
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
  activity: {
    fontSize: 18,
    marginVertical: 4,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TripDetail;
