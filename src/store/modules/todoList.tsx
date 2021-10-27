// const UPDATE_IS_CHECKED = 'todoList/UPDATE_IS_CHECKED';
const UPDATE_TODOLIST = 'todoList/UPDATE_TODOLIST';

const initialState = {
  // isChecked: false,
  todoList: [],
};

// export const updateIsChecked = value => ({
//   type: UPDATE_IS_CHECKED,
//   value: value,
// });

// export const updateCurrentTodo = value => ({
//   type: UPDATE_CURRENT_TODO,
//   value: value,
// });

export const updateTodoList = value => ({
  type: UPDATE_TODOLIST,
  value: value,
});

export default function todoListReducer(state = initialState, action: any) {
  switch (action.type) {
    // case UPDATE_IS_CHECKED:
    //   return {
    //     ...state,
    //     isChecked: action.value,
    //   };
    // case UPDATE_CURRENT_TODO:
    //   return {
    //     ...state,
    //     currentTodo: action.value,
    //   };
    case UPDATE_TODOLIST:
      return {
        ...state,
        todoList: action.value,
      };
    default:
      return state;
  }
}
