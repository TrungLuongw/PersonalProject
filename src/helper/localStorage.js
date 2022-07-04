
const strorage = (todos)=>{
    localStorage.setItem('todos',JSON.stringify(todos));
    console.log('save');
}
const getTodos = ()=>{
    const todos = JSON.parse(localStorage.getItem('todos'));
    return todos || [];
}
export {getTodos,strorage}