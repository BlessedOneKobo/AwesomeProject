import React from "react";
import { Button, Text, View } from "react-native";

function StatusBar({
  count,
  removeCompletedTodoItems,
}: {
  count: { completed: number; incomplete: number };
  removeCompletedTodoItems: () => void;
}) {
  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 4 }}>
          {count.incomplete}
        </Text>
        <Text>item{count.incomplete > 1 ? "s" : ""} left</Text>
      </View>
      {Boolean(count.completed) && (
        <Button
          title={`Clear ${count.completed} completed item${
            count.completed > 1 ? "s" : ""
          }`}
          color="#0b7a23"
          onPress={removeCompletedTodoItems}
        />
      )}
    </View>
  );
}

export default StatusBar;
