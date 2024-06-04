import './TodoEditor.css';
import { useContext, useRef, useState } from 'react';
import { TodoDispatchContext } from '../contexts/TodoContext';

export default function TodoEditor() {
    const [content, setContent] = useState("")
    const inputRef = useRef()
    const {onCreate} = useContext(TodoDispatchContext)

    const onChange = (e) => {
        setContent(e.target.value)
    }

    const onClick = () => {
        if (content.length > 0) {
            onCreate(content)
            setContent("")
        } else {
            inputRef.current.focus()
        }
    }

    const onKey = (e) => {
        if (e.keyCode === 13) onClick()
    }

    return (
        <div className='TodoEditor'>
            <h4>새로운 Todo 작성하기 ✏️</h4>
            <div className='editor_wrapper'>
                <input placeholder='Todo...' ref={inputRef} onChange={onChange} value={content} onKeyDown={onKey}/>
                <button onClick={onClick}>추가</button>
            </div>
        </div>
    );
}

