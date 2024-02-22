import axios from "axios";


const instance = axios.create({
  baseURL: 'https://playground.mockoon.com/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getAxiosInstance = () => {
  return instance;
}

export const getTasksApi = async () => {
  try {
    const response = await instance.get('Todos');
    // console.log('response --- ', response.data)
    return response.data;
  } catch (error) {
    console.log('getTasksApi failed : ', error.message);
    throw error;
  }
}

export const editTaskApi = async (task) => {
  console.log('editTaskApi payload -- ', task);
  try {
    const response = await instance.put(`Todos/${task.id}`, task);
    return response.status;
  } catch (error) {
    console.log('editTaskApi failed : ', error.message);
    throw error;
  }
}

export const createTaskApi = async (task) => {
  console.log('createTaskApi payload -- ', task);
  try {
    const response = await instance.post('Todos', task);
    return response.status;
  } catch (error) {
    console.log('createTaskApi failed : ', error.message);
    throw error;
  }
}

export const deleteTaskApi = async (taskId) => {
  console.log('deleteTaskApi payload -- ', taskId);
  try {
    const response = await instance.delete(`Todos/${taskId}`);
    return response.status;
  } catch (error) {
    console.log('deleteTaskApi failed : ', error.message);
    throw error;
  }
}
