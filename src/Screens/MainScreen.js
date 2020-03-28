import React from './node_modules/react'
import { StyleSheet, View, FlatList } from 'react-native'
import {AddTodo} from "../Components/AddTodo"
import {Todo} from "../Components/Todo"

export const MainScreen = ({addTodo, todos, removeTodo}) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})