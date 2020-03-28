import React, {useState} from 'react';
import {View, StyleSheet, Button, TextInput, Alert} from "react-native";

export const AddTodo = props => {
  const [value, setValue] = useState("")

  const pressHandler = () => {
    if (value.trim()) {
      props.onSubmit(value);
      setValue("");
    } else {
      Alert.alert("Название дела не может быть пустым");
    }
    
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите название дела"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button title="Добавить" onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    borderBottomColor: "#3949ab",
    borderBottomWidth: 2
  }
})
