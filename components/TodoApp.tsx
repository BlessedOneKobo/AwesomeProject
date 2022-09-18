import React, { useState, useRef, useEffect, useMemo } from "react";
import { ScrollView, TextInput } from "react-native";
import TodoListStatusBar from "../components/TodoListStatusBar";
import TodoList from "../components/TodoList";
import TodoListHeading from "../components/TodoListHeading";
import TodoListInput from "../components/TodoListInput";

export interface TodoItem {
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todoList, setTodoList] = useState<Array<TodoItem>>([]);
  const completedTodoList = useMemo(
    () => todoList.filter((item) => item.completed),
    [todoList],
  );
  const numberOfUncompletedItems = useMemo(
    () => todoList.length - completedTodoList.length,
    [completedTodoList],
  );

  const textInput = useRef<TextInput>(null);
  const [inputText, setInputText] = useState("");
  const [allMarked, setAllMarked] = useState(false);

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const updateListAndMasterCheckbox = (list: TodoItem[]) => {
    setTodoList(list);
    setAllMarked(list.every((item) => item.completed));
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
    if (Boolean(todoList.length)) {
      setAllMarked(newValue);
      setTodoList(todoList.map((item) => ({ ...item, completed: newValue })));
    }
  };

  const removeCompletedTodoItems = () => {
    setTodoList(todoList.filter((item) => !item.completed));
    setAllMarked(false);
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
        hasItems={Boolean(todoList.length)}
      />

      <TodoList
        items={todoList}
        removeTodoItem={removeTodoItem}
        toggleTodoItemCompleted={toggleTodoItemCompleted}
      />

      {Boolean(todoList.length) && (
        <TodoListStatusBar
          numberOfCompletedItems={completedTodoList.length}
          numberOfUncompletedItems={numberOfUncompletedItems}
          removeCompletedTodoItems={removeCompletedTodoItems}
        />
      )}
    </ScrollView>
  );
}
