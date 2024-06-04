import React, {useContext} from 'react';
import { TodoDispatchContext } from '../contexts/TodoContext';
import './TodoItem.css';

const TodoItem = ({ id, content, createDate, isDone}) => {
    console.log( `${id} + ${content} update`)
    const {onDelete, onUpdate} = useContext(TodoDispatchContext);

    const onChange = () => {
        onUpdate(id)
    }

    const onClick = () => {
        onDelete(id)
    }

    return (
        <div className='TodoItem'>
            <div className='checkbox_col'>
                <input type='checkbox' defaultChecked={isDone} onChange={onChange} />
            </div>
            <div className='title_col'>{content}</div>
            <div className='date_col'>{createDate}</div>
            <div className='button_col'>
                <button onClick={onClick}>삭제</button>
            </div>
        </div>
    );
}

export default React.memo(TodoItem);
