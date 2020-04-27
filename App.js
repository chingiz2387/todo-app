import React, {useState} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Narbar } from "./src/Components/Narbar";
import { MainScreen } from "./src/Screens/MainScreen";
import { TodoScreen } from './src/Screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState("2")
  const [todos, setTodos] = useState([
    {id: "1", title: "Выучить React Native"},
    {id: "2", title: "Написать приложение"}
  ])
  
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
