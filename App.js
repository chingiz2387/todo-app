import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Narbar } from "./src/Components/Narbar";
import { MainScreen } from "./src/Screens/MainScreen";

export default function App() {
  const [todos, setTodos] = useState([])
  
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
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <View>
       <Narbar title="Todo App"/>
       <View style={styles.container}>
        <MainScreen
          todos={todos}
          addTodo={addTodo}
          removeTodo={removeTodo}          
        />
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
