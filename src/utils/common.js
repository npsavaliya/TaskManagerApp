import Toast from "react-native-root-toast";
import { colors } from "../theme/colors";

export const showErrorToast = (message) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textColor: colors.error
  });
}

export const showSuccessToast = (message) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textColor: colors.success
  });
}

export const formatDueDate = (taskDueDate) => {
  if (!taskDueDate) {
    return '';
  }
  const date = new Date(taskDueDate);
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
}
