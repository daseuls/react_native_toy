const UPDATE_TODOLIST = 'todoList/UPDATE_TODOLIST';
const DELETE_TODOLIST = 'todoList/DELETE_TODOLIST';
const UPDATE_ISCHECKED = 'todoList/UPDATE_ISCHECKED';
const EDIT_TODOLIST = 'todoList/EDIT_TODOLIST';

const initialState = {
  todoList: [],
};

export type Todo = {
  id: number;
  text: string;
  isToday: boolean;
  isChecked: boolean;
};

export const updateTodoList = todoList => ({
  type: UPDATE_TODOLIST,
  value: todoList,
});

export const deleteTodoList = (todoList, idValue) => ({
  type: DELETE_TODOLIST,
  value: todoList.filter(todo => todo.id !== idValue),
});

// export const updateIsChecked = (todoList, idValue, isChecked) => ({
//   type: UPDATE_ISCHECKED,
//   value: todoList.map(el =>
//     el.id === idValue ? {...el, is_checked: isChecked} : el,
//   ),
// });
export const updateIsChecked = todoId => ({
  type: UPDATE_ISCHECKED,
  todoId,
});

export const editTodoList = (todoId, textInput) => ({
  type: EDIT_TODOLIST,
  todoId,
  textInput,
});

export default function todoListReducer(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_TODOLIST:
      return {
        ...state,
        todoList: action.value,
      };
    case DELETE_TODOLIST:
      return {
        ...state,
        todoList: action.value,
      };
    case UPDATE_ISCHECKED:
      return {
        ...state,
        todoList: state.todoList.map((todo: Todo) => {
          if (todo.id !== action.todoId) {
            return todo;
          } else {
            todo.isChecked = !todo.isChecked;
            return todo;
          }
        }),
      };
    case EDIT_TODOLIST:
      return {
        ...state,
        todoList: state.todoList.map((todo: Todo) => {
          if (todo.id !== action.todoId) {
            return todo;
          } else {
            todo.text = action.textInput;
            return todo;
          }
        }),
      };
    default:
      return state;
  }
}
