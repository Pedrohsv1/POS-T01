import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  title: string;
  check: boolean;
}

const ToDoItem = (props: any) => {

  return(
    <div className="todo-item">
          <div className="checker">
            <span><input type="checkbox" onClick={props.handle} /></span>
         </div>
        <span>{props.title}</span>
      <a href="" className="float-right remove-todo-item"><i className="icon-close" /></a>
  </div>
  )
}

const MenuItem = (props: any) => {
  return (
    <>
      <li role="presentation" className="nav-item all-task active">
        <div onClick={props.handleFilter} className="nav-link">{props.title}</div>
      </li>
    </>

  )
}


export const App: React.FC = () => {
  const [toDo, setToDo] = useState<Todo[]>([{id: 1, title: 'New One', check: false}]);
  const [ toDoM, setToDoM ] =  useState<Todo[]>(toDo)

  const updateByIndex = (index : number) => {
    const newArray = [...toDo]
    console.log(newArray)
    newArray[index].check = true;
    setToDo(newArray)
  };
  


    
  const filterByActive = () => {
    const filterActive = toDo.filter((Todo) => Todo.check === true)
    setToDoM(filterActive);
    console.log('Opa')
    
  }

  const filterByCompleted = () => {
    const filterCompleted = toDo.filter((Todo) => Todo.check === false)
    setToDoM(filterCompleted);
  }

  const filterAll = () => {
    setToDoM(toDo);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 0) {
      console.log(e.currentTarget.value)
      const Do = { id: toDo.length + 1, title: e.currentTarget.value, check: false }
      setToDo(prevLista => [
        ...prevLista,
        Do
      ]);
      setToDoM(prevLista => [
        ...prevLista,
        Do
      ]);
      e.currentTarget.value = "";
      e.preventDefault();
    } else if (e.key === 'Enter') {
      alert("Please enter a new task");
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <form>
                  <input
                    type="text"
                    className="form-control add-task"
                    placeholder="New Task..."
                    onKeyPress={handleKeyPress}
                  />
                </form>
                <ul className="nav nav-pills todo-nav">
                  <MenuItem title="All" handleFilter={filterAll} />
                  <MenuItem title="Active" handleFilter={filterByCompleted}/>
                  <MenuItem title="Completed" handleFilter={filterByActive}/>
                </ul>
                <div className="todo-list">
                  {toDoM.map((Do) => {
                    return (
                      <ToDoItem key={Do.id} title={Do.title} handle={updateByIndex}/>
                    )
                  })
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default App;

