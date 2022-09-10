import React from "react";
import { Text, TextInput, Pressable } from "react-native";
import CheckBox from "@react-native-community/checkbox";

interface Props {
  textInput: React.RefObject<TextInput>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleEndEditing: () => void;
  allMarked: boolean;
  markAll: (val: boolean) => void;
  hasItems: boolean;
}

export default function TodoListInput({
  textInput,
  inputText,
  setInputText,
  handleEndEditing,
  allMarked,
  markAll,
  hasItems,
}: Props) {
  return (
    <>
      <TextInput
        ref={textInput}
        placeholder="What needs to be done?"
        value={inputText}
        onChangeText={setInputText}
        onEndEditing={handleEndEditing}
        style={{
          borderColor: "#666",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 16,
          fontStyle: "italic",
          fontSize: 18,
          marginBottom: 4,
        }}
      />
      <Pressable
        style={{
          marginBottom: 16,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => markAll(!allMarked)}>
        <CheckBox value={allMarked} onValueChange={markAll} disabled={!hasItems} />
        <Text>Mark all as completed</Text>
      </Pressable>
    </>
  );
}
