import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TaskItem } from '../../components';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../theme/colors';
import { scale } from '../../utils/sizes';
import { deleteTaskApi, getTasksApi } from '../../services/api';
import { showErrorToast, showSuccessToast } from '../../utils/common';
import { fetchTaskErrorAction, fetchTaskRequestAction, fetchTaskSuccessAction } from '../../redux';

export function TaskListScreen({navigation}) {
  const tasks = useSelector((state) => state.tasks);

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

  const onTaskDelete = React.useCallback(
    async (task) => {
      try {
        const deleteResponse = await deleteTaskApi(task.id);
        if (deleteResponse === 200) {
          showSuccessToast("Task deleted successfully!");
        }

        onFetchTasks();
      } catch (error) {
        showErrorToast(
          "Sorry, we were unable to delete the task, please try again"
        );
      }
    },
    [onFetchTasks]
  );

  const onTaskEdit = React.useCallback((task) => {
    navigation.navigate("EditTaskScreen", { task, isEdit: true });
  }, []);

  const onTaskCreate = React.useCallback(() => {
    navigation.navigate("EditTaskScreen", { isEdit: false });
  }, []);

  const onShowTaskDetails = React.useCallback((task) => {
    navigation.navigate("TaskDetailsScreen", { task });
  }, []);

  return (
    <View style={styles.container} testID="tasks">
      <View style={styles.container}>
        <GestureHandlerRootView>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={tasks}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onTaskEdit={onTaskEdit}
                onTaskDelete={onTaskDelete}
                onTaskDetails={onShowTaskDetails}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </GestureHandlerRootView>
      </View>
      <TouchableOpacity
        style={styles.buttonBox}
        onPress={() => onTaskCreate()}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: colors.background,
  },
  separator: {
    backgroundColor: 'white',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: scale(20),
  },
  buttonBox: {
    alignSelf: 'center',
    marginVertical: scale(20),
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
