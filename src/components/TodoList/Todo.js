import {MdDone} from 'react-icons/md'
import {BsFillTrashFill} from 'react-icons/bs'
const Todo = ({todo,setTodos,todos})=>{

    const deleteHandler = ()=>{
        setTodos(todos.filter((el)=>el.id !== todo.id));
    }
    const checkHandler = ()=>{
        setTodos(todos.map((el)=>{
            if(el.id === todo.id){
                el.complete = !el.complete;
            }   
            return el;
        }))
    }
    return (
        <li className="todo-item" >
            <div className="todo-item-container">
                <input readOnly={true} value = {todo.text} type="text" className={`todo-item-input ${todo.complete? 'active':''}`}/>
                <div className="todo-item-btn-container">
                    <button onClick={checkHandler} className='todo-btn todo-btn-finish'>
                        <MdDone/>
                    </button>
                    <button onClick={deleteHandler} className="todo-btn todo-btn-remove">
                        <BsFillTrashFill/>
                    </button>
                </div>
            </div>
        </li>
    )
}
export default Todo