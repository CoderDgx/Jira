import React, { ComponentProps } from "react";
import { useTaskTypes } from "utils/task-type";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: taskTYpes } = useTaskTypes();
  return <IdSelect options={taskTYpes || []} {...props}></IdSelect>;
};
