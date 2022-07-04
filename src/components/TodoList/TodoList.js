import './Todolist.css';
import Todo from './Todo'
const Todolist = ({status,todos,setTodos})=>{
    return (
            <div className="todo-container">
                <ul className="todo-list">
                    {todos.map((todo)=>{
                        if(status==='all')
                        {
                            return (
                                <Todo 
                                key={todo.id} 
                                todo={todo} 
                                setTodos={setTodos} 
                                todos={todos}/>
                                )
                        }
                        if(todo.complete===JSON.parse(status))
                            return (
                                <Todo 
                                key={todo.id} 
                                todo={todo} 
                                setTodos={setTodos} 
                                todos={todos}/>
                            )
                        
                    })
                    }                   
                </ul>
            </div>
    )
}
export default Todolist

/* <li className="todo-item">
                        <div className="todo-item-container">
                            <input readOnly={true} type="text" className="todo-item-input"/>
                            <div className="todo-item-btn-container">
                                <button className="todo-btn todo-btn-finish">
                                    <MdDone/>
                                </button>
                                <button className="todo-btn todo-btn-remove">
                                    <BsFillTrashFill/>
                                </button>
                            </div>
                        </div>
                    </li> */