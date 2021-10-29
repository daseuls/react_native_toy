import {combineReducers} from 'redux';
import todoListReducer from './todoList';

// 리듀서가 여러개일 때는 redux의 내장 함수인 combineReducers를 사용하여 리듀서를 하나로 합치는 작업을 한다.
// redux persist에서는 combineReducers 작동 안함
export const rootReducer = combineReducers({
  todoListReducer,
});

export default rootReducer;
