import { useRef,useState, useMemo } from "react"
import { useRecoilState } from "recoil"
import produce from "immer"

import { todosAtom, lastTodoIdAtom } from "./atoms"
import { dateToStr } from "./util"


export function useTodoOptionDrawerStatus() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);

  return {
    todoId,
    opened,
    close,
    open
  };
}
export function useTodosStatus() {
    const [todos, setTodos] = useRecoilState(todosAtom);
    const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
    const lastTodoIdRef = useRef(lastTodoId);
  
    lastTodoIdRef.current = lastTodoId;
  
    const addTodo = (regDate, newContent) => {
      const id = ++lastTodoIdRef.current;
      setLastTodoId(id);
  
      const newTodo = {
        id,
        content: newContent,
        regDate: dateToStr(new Date(regDate))
      };
  
      setTodos((todos) => [newTodo, ...todos]);
  
      return id;
    };
  
    const modifyTodo = (index, newContent) => {
      const newTodos = todos.map((todo, _index) =>
        _index != index ? todo : { ...todo, content: newContent }
      );
      setTodos(newTodos);
    };
  
    const modifyTodoById = (id, newContent) => {
      const index = findTodoIndexById(id);
  
      if (index == -1) {
        return;
      }
  
      modifyTodo(index, newContent);
    };
  
    const removeTodo = (index) => {
      const newTodos = todos.filter((_, _index) => _index != index);
      setTodos(newTodos);
    };
  
    const removeTodoById = (id) => {
      const index = findTodoIndexById(id);
  
      if (index != -1) {
        removeTodo(index);
      }
    };
  
    const findTodoIndexById = (id) => {
      return todos.findIndex((todo) => todo.id == id);
    };
  
    const findTodoById = (id) => {
      const index = findTodoIndexById(id);
  
      if (index == -1) {
        return null;
      }
  
      return todos[index];
    };
    const toggleTodoComletedById =(id)=>{
      const index = findTodoIndexById(id)
      if(index == -1){
        return;
      }
      setTodos(
        produce(todos, (draft)=>{
          draft[index].completed = !draft[index].completed;
        })
      )
    }
  
    return {
      todos,
      addTodo,
      modifyTodo,
      modifyTodoById,
      removeTodo,
      removeTodoById,
      findTodoById,
      toggleTodoComletedById
    };
  }

  