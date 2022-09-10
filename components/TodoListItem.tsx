import React from "react";
import { Button, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import type { TodoItem } from "./TodoApp";

interface Props {
  item: TodoItem;
  idx: number;
  removeTodoItem: (idx: number) => void;
  toggleTodoItemCompleted: (idx: number) => void;
}

export default function TodoListItem({
  item,
  idx,
  removeTodoItem,
  toggleTodoItemCompleted,
}: Props) {
  return (
    <View
      key={`${item.text}${idx}`}
      style={{
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}>
      <CheckBox
        style={{ flex: 1 }}
        value={item.completed}
        onValueChange={() => toggleTodoItemCompleted(idx)}
      />
      <Text
        style={{
          flex: 3,
          fontSize: 16,
          color: item.completed ? "#aaa" : "#333",
          textDecorationLine: item.completed ? "line-through" : "none",
        }}>
        {item.text}
      </Text>
      <View style={{ flex: 1 }}>
        <Button title="delete" color="#870b2a" onPress={() => removeTodoItem(idx)} />
      </View>
    </View>
  );
}
