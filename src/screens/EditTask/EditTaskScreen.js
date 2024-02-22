import React from "react";
import { TaskForm } from "../../components";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from "react-native";
import { colors } from "../../theme/colors";
import { createTaskApi, editTaskApi, getTasksApi } from "../../services/api";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { useDispatch } from "react-redux";
import { fetchTaskErrorAction, fetchTaskRequestAction, fetchTaskSuccessAction } from "../../redux";

export function EditTaskScreen({ route, navigation }) {
  const { task, isEdit } = route.params;

  const dispatch = useDispatch();

  const onFetchTasks = React.useCallback(async () => {
    try {
      dispatch(fetchTaskRequestAction());
      const tasks = await getTasksApi();
      if (Array.isArray(tasks)) {
        dispatch(fetchTaskSuccessAction(tasks));
      }
    } catch (error) {
      dispatch(fetchTaskErrorAction());
    }
  }, []);

  const onEditTask = React.useCallback(async (task) => {
    try {
      const response = await editTaskApi(task);
      console.log('response');
      if (response === 200) {
        onFetchTasks();
        showSuccessToast('Task edited successfully!');
      }
      navigation.goBack();
    } catch (error) {
      showErrorToast('Sorry, we failed to edit the task, please try again')
    }
  }, []);

  const onCreateTask = React.useCallback(async () => {
    try {
      const response = await createTaskApi(task);
      if (response === 200) {
        onFetchTasks();
        showSuccessToast('Task edited successfully!');
      }
      navigation.goBack();
    } catch (error) {
      showErrorToast('Sorry, we failed to edit the task, please try again')
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? undefined : "padding"}
      enabled
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TaskForm task={task} onEditTask={onEditTask} onCreateTask={onCreateTask} isEdit={isEdit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    width: '100%',
    alignItems: 'center'
  },
});
