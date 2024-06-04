import './App.css'
import Header from './component/Header'
import TodoEditor from './component/TodoEditor'
import TodoList from './component/TodoList'
import { useRef, useReducer, useCallback, useMemo } from 'react'
import { TodoStateContext, TodoDispatchContext } from './contexts/TodoContext'

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.newItem, ...state]
    case 'UPDATE':
      return state.map(item =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      )
    case 'DELETE':
      return state.filter(item => item.id !== action.targetId)
    default:
      return state
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)

  const onCreate = useCallback(content => {
    const item = {
      id: idRef.current,
      content: content,
      isDone: false,
      createDate: new Date().getTime(),
    }
    idRef.current += 1
    dispatch({ type: 'CREATE', newItem: item })
  }, [])

  const onUpdate = useCallback(id => {
    dispatch({ type: 'UPDATE', targetId: id })
  }, [])

  const onDelete = useCallback(id => {
    dispatch({ type: 'DELETE', targetId: id })
  }, [])

  const memorizedDispatches = useMemo(() => {
    return {onCreate, onDelete, onUpdate}
  }, [onCreate, onDelete, onUpdate])

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={{ todo }}>
        <TodoDispatchContext.Provider value={memorizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
