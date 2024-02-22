import React from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colors } from '../../theme/colors';
import { fontScale, scale } from '../../utils/sizes';

export function TaskItem({task, onTaskEdit, onTaskDelete, onTaskDetails}) {
  const swipeableRow = React.useRef(null);

  const onRef = (ref) => {
    swipeableRow.current = ref;
  }

  const close = () => {
    this.swipeableRow?.current?.close();
  };

  const onEdit = () => {
    close();
    onTaskEdit?.(task);
  };

  const onDelete = () => {
    close();
    onTaskDelete?.(task);
  }

  const renderLeftActions = (_progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={styles.leftAction} onPress={onEdit}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Edit
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={onDelete}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress, _dragAnimatedValue) => (
    <View
      style={{
        width: 192,
        flexDirection: "row",
      }}
    >
      {renderRightAction("Delete", "#dd2c00", scale(60), progress)}
    </View>
  );

  const Row = () => (
    // eslint-disable-next-line no-alert
    <RectButton style={styles.rectButton} onPress={() => onTaskDetails(task)}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>Title: {task.title}</Text>
      </View>
      <Text style={styles.titleText}>
        Completed: {String(task.completed)}
      </Text>
    </RectButton>
  );

  return (
    <Swipeable
      ref={onRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableOpen={(direction) => {
        console.log(`Opening swipeable from the ${direction}`);
      }}
      onSwipeableClose={(direction) => {
        console.log(`Closing swipeable to the ${direction}`);
      }}
    >
      <Row item={task} />
    </Swipeable>
  );
}


const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  titleBox: {
    marginBottom: scale(4),
  },
  titleText: {
    color: 'white',
    fontSize: fontScale(14),
    fontWeight: '500',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: fontScale(16),
    padding: scale(10),
    fontWeight: 'bold',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
