const UPDATE_IS_TODAY = 'todoList/UPDATE_IS_TODAY';
const UPDATE_CURRENT_TODO = 'todoList/UPDATE_CURRENT_VALUE';
const UPDATE_TODOLIST = 'todoList/UPDATE_TODOLIST';

const initialState = {
  isToday: true,
  currentTodo: '',
  todoList: [],
};

export const updateIsTodayAction = value => ({
  type: UPDATE_IS_TODAY,
  value: value,
});

export const updateCurrentTodo = value => ({
  type: UPDATE_CURRENT_TODO,
  value: value,
});

export const updateTodoList = value => ({
  type: UPDATE_TODOLIST,
  value: value,
});

export default function todoListReducer(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_IS_TODAY:
      return {
        ...state,
        isToday: action.value,
      };
    case UPDATE_CURRENT_TODO:
      return {
        ...state,
        currentTodo: action.value,
      };
    case UPDATE_TODOLIST:
      return {
        ...state,
        todoList: action.value,
      };
    default:
      return state;
  }
}
