import React, {useState} from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {THEME} from "../theme"
import { AppCard } from '../Components/UI/AppCard'
import { EditModal } from '../Components/EditModal'

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
  const [modal, setModal] = useState(false)

  const saveHandler = title => {
    onSave(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal 
        onVisible={modal}
        onCancel={() => setModal(false)}
        value={todo.title}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button
          title="Ред."
          onPress={() => setModal(true)}
        />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button 
            title="Назад"
            onPress={goBack}
            color={THEME.GREY_COLOR}
          />
        </View>
        <View style={styles.button}>
          <Button title="Удалить" 
            color={THEME.DANGER_COLOR} 
            onPress={() => onRemove(todo.id)}
          />
        </View>      
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20
  }
})