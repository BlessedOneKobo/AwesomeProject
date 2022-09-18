import React from "react";
import { Button, Text, View } from "react-native";

function StatusBar({
  numberOfCompletedItems,
  numberOfUncompletedItems,
  removeCompletedTodoItems,
}: {
  numberOfCompletedItems: number;
  numberOfUncompletedItems: number;
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
          {numberOfUncompletedItems}
        </Text>
        <Text>item{numberOfUncompletedItems !== 1 ? "s" : ""} left</Text>
      </View>
      {Boolean(numberOfCompletedItems) && (
        <Button
          title={`Clear ${numberOfCompletedItems} completed item${
            numberOfCompletedItems !== 1 ? "s" : ""
          }`}
          color="#0b7a23"
          onPress={removeCompletedTodoItems}
        />
      )}
    </View>
  );
}

export default StatusBar;
