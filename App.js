/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//  TODO: 입력시 스크롤뷰 밀리지 않도록 설정하기
import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  KeyboardAvoidingView
} from 'react-native';

const App = () => {
  const [text, setText] = useState("");
  // Todo: { id: 0, text: "", completed: false }
  const [todoList, setTodoList] = useState([{ id: 0, text: "", completed: false }]);

  const updateTodo = (modifiedTodo) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id === modifiedTodo.id) {
        return modifiedTodo;
      } else {
        return todo;
      }
    })

    return newTodoList;
  }

  const deleteTodo = (targetTodo) => {
    const newTodoList = todoList.filter(todo => {
      if (todo.id !== targetTodo.id) {
        return todo;
      }
    })

    return newTodoList;
  }

  const addTodo = (newTodo) => {
    const newTodoList = todoList.concat(newTodo);

    return newTodoList;
  }

  const onTextSubmitHandler = (event) => {
    const eventTemp = Object.assign({}, event);
    const newTodo = { id: Math.floor(Math.random() * 10000), text: eventTemp.nativeEvent.text, completed: false }
    setTodoList(addTodo(newTodo));
    setText("");
  }

  const onTodoDeleteClickHandler = (todo) => (event) => {
    setTodoList(deleteTodo(todo));
  }

  const onTodoCompleteClickHandler = (todo) => (event) => {
    const newTodo = Object.assign({}, { ...todo, completed: !todo.completed });
    setTodoList(updateTodo(newTodo));
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          bounces
        >
          {todoList.map((todo, index) => (
            <View key={todo.id}>
              <Text style={todo.completed ? styles.completed : ""}>
                {`${index + 1}. ${todo.text}`}
              </Text>
              <Button
                title="삭제"
                onPress={onTodoDeleteClickHandler(todo)}
              />
              <Button
                title={todo.completed ? `완료` : "취소"}
                onPress={onTodoCompleteClickHandler(todo)}
              />
            </View>
          ))}

          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            autoFocus
            blurOnSubmit
            clearTextOnFocus
            keyboardType={"default"}
            maxLength={100}
            placeholder={"오늘 할 일을 입력하세요."}
            onSubmitEditing={onTextSubmitHandler}
          />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: `aquamarine`,
    height: "100%"
  },
  textInput: {
    borderColor: 'gray', borderWidth: 1, backgroundColor: `white`
  },
  completed: {
    textDecorationLine: "line-through"
  }
});

export default App;
