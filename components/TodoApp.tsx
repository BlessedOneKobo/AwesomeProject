import React, { useState, useRef, useEffect } from "react";
import { ScrollView, TextInput, ToastAndroid } from "react-native";
import TodoListStatusBar from "../components/TodoListStatusBar";
import TodoList from "../components/TodoList";
import TodoListHeading from "../components/TodoListHeading";
import TodoListInput from "../components/TodoListInput";

export interface TodoItem {
  text: string;
  completed: boolean;
}

function showToast({ visible, message }: { visible: boolean; message: string }) {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }

  return null;
}

export default function TodoApp() {
  const [todoList, setTodoList] = useState<Array<TodoItem>>([]);
  const completedTodoList = todoList.filter((item) => item.completed);

  const textInput = useRef<TextInput>(null);
  const [inputText, setInputText] = useState("");
  const [allMarked, setAllMarked] = useState(false);

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const updateListAndMasterCheckbox = (list: TodoItem[]) => {
    setTodoList(list);
    setAllMarked(!!list.length && list.every((item) => item.completed));

    if (!list.length) {
      showToast({ visible: true, message: "List is empty" });
    }
  };

  const removeTodoItem = (selectedIndex: number) => {
    updateListAndMasterCheckbox(
      todoList.slice(0, selectedIndex).concat(todoList.slice(selectedIndex + 1)),
    );
  };

  const toggleTodoItemCompleted = (selectedIndex: number) => {
    updateListAndMasterCheckbox(
      todoList.map((item, index) =>
        index === selectedIndex ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleEndEditing = () => {
    const trimmedInputText = inputText.trim();

    if (trimmedInputText) {
      updateListAndMasterCheckbox(
        todoList.concat({ text: trimmedInputText, completed: false }),
      );
      setInputText("");
      textInput.current?.focus();
    }
  };

  const markAll = (newValue: boolean) => {
    if (todoList.length) {
      setAllMarked(newValue);
      setTodoList(todoList.map((item) => ({ ...item, completed: newValue })));
    }
  };

  const removeCompletedTodoItems = () => {
    updateListAndMasterCheckbox(todoList.filter((item) => !item.completed));
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TodoListHeading title="Todo List" />

      <TodoListInput
        textInput={textInput}
        inputText={inputText}
        setInputText={setInputText}
        handleEndEditing={handleEndEditing}
        allMarked={allMarked}
        markAll={markAll}
        hasItems={!!todoList.length}
      />

      <TodoList
        items={todoList}
        removeTodoItem={removeTodoItem}
        toggleTodoItemCompleted={toggleTodoItemCompleted}
      />

      {!!todoList.length && (
        <TodoListStatusBar
          totalNumberOfItems={todoList.length}
          numberOfCompletedItems={completedTodoList.length}
          removeCompletedTodoItems={removeCompletedTodoItems}
        />
      )}
    </ScrollView>
  );
}
