import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleTaskCompletion, deleteTask } from '../app/store/taskslice';
import { RootState } from '../app/store/store';
import { router } from 'expo-router';

const TodoApp = () => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [isInputVisible, setInputVisible] = useState<boolean>(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [scaleAnim] = useState(new Animated.Value(0)); 
  const [fadeAnim] = useState(new Animated.Value(0)); 

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));
      setTaskTitle('');
      scaleOut(); 
    }
  };

  const scaleIn = () => {
    setInputVisible(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1, 
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const scaleOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0, 
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setInputVisible(false);
    });
  };

  const handleAddButtonPress = () => {
    if (isInputVisible) {
      scaleOut();
    } else {
      scaleIn(); 
    }
  };

  const renderTask = ({ item }: { item: { id: number; title: string; completed: boolean } }) => (
    <View style={styles.task}>

      <TouchableOpacity onPress={() => dispatch(toggleTaskCompletion(item.id))}>
        <Text style={item.completed ? styles.completedTask : styles.taskTitle}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => dispatch(deleteTask(item.id))} />
    </View>
  );

  return (
    <View style={styles.container_task}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
      {isInputVisible && (
        <View style={styles.container_textinput}>
          <Animated.View style={{ opacity: fadeAnim, left: 100 }}>
            <Button title="Add Task" onPress={handleAddTask} />
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={taskTitle}
              onChangeText={setTaskTitle}
              placeholderTextColor={"grey"}
            />
          </Animated.View>
        </View>
      )}

      <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddButtonPress}>
        
          <Image source={require('./assets/images/button.png')} style={styles.addbutton} />
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_task: {
    marginTop: 60,
    padding: 20,
    flex: 1,
    position: 'relative',
  },
  container_textinput: {
    padding: 20,
  },
  input: {
    paddingBottom: 160,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    height: 200,
    paddingLeft: 10,
    borderRadius: 25,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
  },
  completedTask: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  addbutton: {
    width: 90,
    height: 90,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default TodoApp;
