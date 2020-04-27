import React, {useState} from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ onVisible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert("Ошибка!", `Мнимальная длина название 3 символа. Сейчас ${title.trim().length} символов`)
    } else {
      onSave(title)
    }
  }

  return (
    <Modal 
      visible={onVisible} 
      animationType="slide" 
      transparent={false}>
      <View style={styles.wrap}>
        <TextInput style={styles.input}
          value={title}
          onChangeText={setTitle} 
          placeholder="Введите название" 
          autoCapitalize="none" 
          autoCorrect={false} 
          maxLength={64}
        />
        <View style={styles.buttons}>
          <Button title="Отменить" 
            onPress={onCancel} 
            color={THEME.DANGER_COLOR}
          />
          <Button title="Сохранить" onPress={saveHandler}/>
        </View>        
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%"
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
})