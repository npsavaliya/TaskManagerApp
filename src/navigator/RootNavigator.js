import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskListScreen } from '../screens/TaskList/TaskListScreen';
import { EditTaskScreen } from '../screens/EditTask/EditTaskScreen';
import { TaskDetailsScreen } from '../screens/TaskDetails/TaskDetailsScreen';
import { useDispatch } from 'react-redux';
import { getTasksApi } from '../services/api';
import { fetchTaskErrorAction, fetchTaskRequestAction, fetchTaskSuccessAction } from '../redux';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const dispatch = useDispatch();

  React.useEffect(() => {

    const getTaskList = async () => {
      try {
        dispatch(fetchTaskRequestAction());
        const taskList = await getTasksApi();
        dispatch(fetchTaskSuccessAction(taskList));
      } catch (error) {
        dispatch(fetchTaskErrorAction());
      }
    }

    getTaskList();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TaskListScreen'>
        <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
        <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} />
        <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
