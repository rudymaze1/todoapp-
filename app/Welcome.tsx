import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Video } from 'expo-av'; 

const Welcome = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/Trips');
  };

  return (
    <View style={styles.container}>
      <Video 
        source={require('./assets/videos/roadtrip.mp4')} 
        style={styles.backgroundVideo} 
        shouldPlay 
        isLooping 
      />
      <View>
        <Text style={styles.title}>Welcome to the Todo App!</Text>
        <Button title="Get Started" onPress={handleGetStarted} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFF0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "black", 
    fontFamily: 'SulphurPoint-bold',
  },
  overlay: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 250,
    width: '100%', 
    height: '100%', 
  },
});

export default Welcome;




