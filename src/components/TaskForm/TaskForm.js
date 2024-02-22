import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { fontScale, scale } from "../../utils/sizes";
import { colors } from "../../theme/colors";
import { formatDueDate } from "../../utils/common";
import { DropdownComponent } from "../DropDown/DropDown";

export function TaskForm({ task, onEditTask, onCreateTask, isEdit }) {
  const [completed, setCompleted] = React.useState(task?.completed ?? false);
  const [title, setTitle] = React.useState(task?.title ?? "");
  const [priority, setPriority] = React.useState(task?.priority ?? 0);
  const [dueDate, setDueDate] = React.useState(formatDueDate(task?.dueDate));

  const completedData = React.useRef([
    { label: "true", value: true },
    { label: "false", value: false },
  ]).current;

  const priorityData = React.useRef([
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ]).current;

  const InputField = ({
    value,
    label,
    placeholderText,
    onChangeText,
    lines,
  }) => (
    <View style={styles.inputBox}>
      <View style={styles.labelBox}>
        <Text style={styles.fieldText}>{label}</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholderText}
          numberOfLines={lines}
          multiline={!!lines}
        />
      </View>
    </View>
  );

  const taskData = {
    title,
    priority,
    dueDate: Date.UTC(new Date(dueDate)),
    completed,
  };

  if (isEdit) {
    taskData.id = task.id;
  }

  // console.log('taskData', taskData);

  return (
    <>
      {isEdit && (
        <View style={styles.inputBox}>
          <Text style={styles.fieldText}>ID: {task.id}</Text>
        </View>
      )}
      <View style={styles.inputBox}>
        <View style={styles.labelBox}>
          <Text style={styles.fieldText}>{"Title"}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder={"Please input task title"}
            numberOfLines={4}
            multiline
          />
        </View>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.labelBox}>
          <Text style={styles.fieldText}>Priority</Text>
        </View>
        <DropdownComponent
          value={priority}
          data={priorityData}
          onChange={(status) => setPriority(status.value)}
          placeholderText="Please select task priority"
        />
      </View>
      <View style={styles.inputBox}>
        <View style={styles.labelBox}>
          <Text style={styles.fieldText}>{"Due Date (mm-dd-yyyy)"}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={(text) => setDueDate(text)}
            placeholder={"Please input task due date"}
            numberOfLines={4}
            multiline
          />
        </View>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.labelBox}>
          <Text style={styles.fieldText}>Completed</Text>
        </View>
        <DropdownComponent
          value={completed}
          data={completedData}
          onChange={(status) => setCompleted(status.value)}
          placeholderText="Please select task completed status"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonBox}
        onPress={() => (isEdit ? onEditTask(taskData) : onCreateTask(taskData))}
      >
        <Text style={styles.buttonText}>{isEdit ? "Edit" : "Create"}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: "100%",
    margin: scale(20),
    alignSelf: "flex-start",
  },
  input: {
    paddingVertical: scale(10),
    fontSize: fontScale(16),
    fontWeight: "500",
    color: "white",
  },
  fieldText: {
    fontSize: fontScale(16),
    fontWeight: "500",
    color: "white",
  },
  labelBox: {
    marginBottom: scale(5),
  },
  labelText: {
    fontSize: fontScale(14),
    fontWeight: "bold",
    color: "white",
  },
  buttonBox: {
    marginTop: scale(20),
    width: scale(100),
    height: scale(50),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.activeButtonBackground,
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "white",
  },
});
