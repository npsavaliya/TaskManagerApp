import React from 'react';
import { Task } from '../../components';


export function TaskDetailsScreen({route}) {

  const { task } = route.params;

  return (
   <Task task={task} />
  );
}