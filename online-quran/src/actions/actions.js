//const defining type of action object
export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

// following are action creators, these will simply return action objects
export function createTaskAction(taskId, task, taskPrice, taskDesc) {
  return {
    type: CREATE_TASK,
    tasks: {
      id: taskId,
      name: task,
      price: taskPrice,
      description: taskDesc
    }
  };
}

export function deleteTaskAction(id) {
  return {
    type: DELETE_TASK,
    id
  };
}
export function generateId() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}
