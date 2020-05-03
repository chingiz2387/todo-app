import React, { useState } from 'react';
import { StyleSheet, View, Alert, YellowBox } from 'react-native';
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Narbar } from "./src/Components/Narbar";
import { MainScreen } from "./src/Screens/MainScreen";
import { TodoScreen } from './src/Screens/TodoScreen';

YellowBox.ignoreWarnings(['Remote debugger']);

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    {id: "1", title: "Выучить React Native"},
  ])

  if (!isReady) {
    return (
      <AppLoading 
        startAsync={loadApplication} 
        onError={err => console.log("Test err", err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }
  
  const addTodo = (title) => {
    setTodos( prev => [
      ...prev,        
      {
        id: Date.now().toString(),
        title
      }
    ])    
  }

  const removeTodo = (id) => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      "Удаления элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { 
          text: "Удалить", 
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          } 
        }
      ],
      { cancelable: false }
    );  
  }

  const updateTodo = (id, title) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }))
  }


  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}          
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = (
      <TodoScreen 
        goBack={() => setTodoId(null)} 
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
       <Narbar title="Todo App"/>
       <View style={styles.container}>
        {content}
       </View>        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});
