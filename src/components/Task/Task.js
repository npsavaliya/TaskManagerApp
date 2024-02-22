import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { fontScale, scale } from '../../utils/sizes';
import { colors } from '../../theme/colors';
import { formatDueDate } from '../../utils/common';

/*
  {
    "id": "c7266f89-b777-45aa-83ad-01d4bad47eb7",
    "title": "optimize real-time architectures",
    "completed": true,
    "priority": 0,
    "dueDate": "2024-09-24T10:13:39.649Z"
  }
*/

export function Task({task}) {
  return (
    <View style={styles.container}>
      <View style={styles.detailsBox}>
        <Text style={styles.detailsText}>ID: {task.id}</Text>
      </View>
      <View style={styles.detailsBox}>
        <Text style={styles.detailsText}>Title: {task.title}</Text>
      </View>
      <View style={styles.detailsBox}>
        <Text style={styles.detailsText}>Due Date: {formatDueDate(task.dueDate)}</Text>
      </View>
      <View style={styles.detailsBox}>
        <Text style={styles.detailsText}>Priority: {task.priority}</Text>
      </View>
      <View style={styles.detailsBox}>
        <Text style={styles.detailsText}>completed: {String(task.completed)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailsBox: {
    margin: scale(20),
  },
  detailsText: {
    fontSize: fontScale(16),
    fontWeight: '500',
    color: 'white'
  },
});
