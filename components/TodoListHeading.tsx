import React from "react";
import { Text } from "react-native";

interface Props {
  title: string;
}

export default function TodoListHeading({ title }: Props) {
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 16,
      }}>
      {title}
    </Text>
  );
}
