import './TodoList.css';
import { useState, useMemo, useContext } from 'react';
import TodoItem from './TodoItem';
import { TodoStateContext } from '../contexts/TodoContext';

export default function TodoList() {
    const { todo } = useContext(TodoStateContext);
    const [search, setSearch] = useState('');
    const searchResult =
        search.length === 0
            ? todo
            : todo.filter(item => item.content.toLowerCase().includes(search.toLowerCase()))
    const children = searchResult.map(item => <TodoItem key={item.id} {...item} />)
    
    function onSearch(keyword) {
        setSearch(keyword)
    }
   
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const analyzeTodo = useMemo(() => {
        console.log('Analyze')
        const totalCount = todo.length
        const doneCount = todo.filter(it => it.isDone).length
        const notDoneCount = totalCount - doneCount
        return { totalCount, doneCount, notDoneCount }
    }, [todo])
    const { totalCount, doneCount, notDoneCount } = analyzeTodo

    return (
        <div className='TodoList'>
            <h4>Todo List</h4>
            <div>
                <p>
                    total:{totalCount}, done:{doneCount}, not done:{notDoneCount}
                </p>
            </div>
            <input className='searchbar' placeholder='검색어를 입력하세요' onChange={onChange} />
            <div className='list_wrapper'>
                {children}
            </div>
        </div>
    );
}
