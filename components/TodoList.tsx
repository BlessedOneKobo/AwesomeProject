import React from "react";
import { ScrollView } from "react-native";
import TodoListItem from "./TodoListItem";
import type { TodoItem } from "./TodoApp";

interface Props {
  items: Array<TodoItem>;
  removeTodoItem: (idx: number) => void;
  toggleTodoItemCompleted: (idx: number) => void;
}

export default function TodoList({
  items,
  removeTodoItem,
  toggleTodoItemCompleted,
}: Props) {
  return (
    <ScrollView>
      {items.map((item, idx) => (
        <TodoListItem
          item={item}
          idx={idx}
          key={`${item.text}${idx}`}
          removeTodoItem={removeTodoItem}
          toggleTodoItemCompleted={toggleTodoItemCompleted}
        />
      ))}
    </ScrollView>
  );
}
