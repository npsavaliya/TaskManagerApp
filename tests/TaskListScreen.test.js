import { render, waitFor, cleanup } from "@testing-library/react-native";
import { TaskListScreen } from "../src/screens/TaskList/TaskListScreen";
import { store } from "../src/redux";
import * as reactRedux from 'react-redux'
import MockAdapter from "axios-mock-adapter";
import { getAxiosInstance } from "../src/services/api";

jest.mock('react-redux')  

const tasks = [
  {
    id: 1,
    title: "Buy milk",
    completed: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    completed: true,
  },
];

const mock = new MockAdapter(getAxiosInstance(), { onNoMatch: "throwException" });

describe("axios mocking test", () => {
  it("should render loading followed by todos", async () => {

    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    
    useSelectorMock.mockReturnValue(tasks)
    mock.onGet("Todos").reply(200, tasks);

    const { queryByText, getByTestId } = render(
      <reactRedux.Provider store={store}>
        <TaskListScreen />
      </reactRedux.Provider>
    );;

    expect(queryByText(/Walk the dog/i)).;

    await waitFor(() => getByTestId("tasks"));
    expect(queryByText(/Walk the dog/i)).toBeDefined();
  });
});