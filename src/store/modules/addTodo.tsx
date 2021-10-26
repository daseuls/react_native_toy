const CHANGE_ISTODAY = 'addTodo/CHANGE_ISTODAY';
// const CHANGE_CURRENT_TODO = 'addTodo/CHANGE_CURRENT_TODO';
// const SET_TODOLIST = 'addTodo/SET_TODOLIST';

export const changeIstoday = () => ({type: CHANGE_ISTODAY});
// export const changeCurrentTodo = () => ({type: CHANGE_CURRENT_TODO});
// export const setTodolist = () => ({type: SET_TODOLIST});

const initialState = {
  isToday: true,
};

export default function addTodo(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ISTODAY:
      return {
        ...state,
        isToday: false,
      };
    default:
      return state;
  }
}
