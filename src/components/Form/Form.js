import {MdAddBox} from 'react-icons/md'
import './Form.css'
const Form = ({status,setStatus,setInputText,inputText,todos,setTodos})=>{
    
    const inputTextHandler = (e)=>{
        setInputText(e.target.value);
    }
    const submitHandler = (e)=>{
        console.log(todos)
        e.preventDefault();
        setTodos([
            ...todos,{text:inputText,complete:false,id:Math.floor(Math.random()*10000)}
        ]);
        setInputText('');
    };
    const statusHandler = (e)=>{
        setStatus(e.target.value);
        console.log(status)
    }
    return (
      <form className='form-container'>
        <div className="container">
        <div className="form-insert">
            <input onChange={inputTextHandler} value={inputText} type="text" className="form-insert-input"/>
            <button onClick={submitHandler} className="form-insert-button">
                <MdAddBox className='button-icon'></MdAddBox>
            </button>
        </div>
        <div className='select-container'>
            <select className='select-box' onChange={statusHandler}>
                <option value="all" className='select-item'>All</option>
                <option value="true" className='select-item'>Completed</option>
                <option value="false" className='select-item'>Uncompleted</option>
            </select>
        </div>
        </div>
      </form>  
    )
}

export default Form