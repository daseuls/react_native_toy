const UPDATE_TODOLIST = 'todoList/UPDATE_TODOLIST';

const initialState = {
  todoList: [],
};

export const updateTodoList = value => ({
  type: UPDATE_TODOLIST,
  value: value,
});

export default function todoListReducer(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_TODOLIST:
      return {
        ...state,
        todoList: action.value,
      };
    default:
      return state;
  }
}
