import React, { useState, useRef, useEffect } from "react";
import { ScrollView, TextInput } from "react-native";
import TodoListStatusBar from "../components/TodoListStatusBar";
import TodoList from "../components/TodoList";
import TodoListHeading from "../components/TodoListHeading";
import TodoListInput from "../components/TodoListInput";

export interface TodoItem {
  text: string;
  completed: boolean;
}

export interface TodoCount {
  completed: number;
  incomplete: number;
}

export default function TodoApp() {
  const textInput = useRef<TextInput>(null);
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<Array<TodoItem>>([]);
  const [allMarked, setAllMarked] = useState(false);
  const [count, setCount] = useState({ completed: 0, incomplete: 0 });

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  useEffect(() => {
    const completedTodoList = todoList.filter((item) => item.completed);

    setCount({
      completed: completedTodoList.length,
      incomplete: todoList.length - completedTodoList.length,
    });
  }, [todoList]);

  useEffect(() => {
    if (todoList.length && count.completed === todoList.length) {
      setAllMarked(true);
    } else {
      setAllMarked(false);
    }
  }, [count]);

  const removeTodoItem = (idx: number) => {
    setTodoList(todoList.slice(0, idx).concat(todoList.slice(idx + 1)));
  };

  const toggleTodoItemCompleted = (idx: number) => {
    const list = [...todoList];
    list[idx].completed = !list[idx].completed;
    setTodoList(list);
  };

  const handleEndEditing = () => {
    const trimmedInputText = inputText.trim();

    if (trimmedInputText) {
      setTodoList([...todoList, { text: trimmedInputText, completed: false }]);
      setInputText("");
      textInput.current?.focus();
    }
  };

  const markAll = (newValue: boolean) => {
    setAllMarked(newValue);
    setTodoList(todoList.map((item) => ({ ...item, completed: newValue })));
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
          count={count}
          removeCompletedTodoItems={removeCompletedTodoItems}
        />
      )}
    </ScrollView>
  );
}
