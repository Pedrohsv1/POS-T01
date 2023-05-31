import React from 'react';
import './App.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';

const ToDoItem = (props: any) => {
  return(
    <div className="todo-item">
          <div className="checker">
            <span><input type="checkbox" /></span>
         </div>
        <span>{props.title}</span>
      <a href="javascript:void(0);" className="float-right remove-todo-item"><i className="icon-close" /></a>
  </div>
  )
}

const MenuItem = (props: any) => {
  return (
    <>
      <li role="presentation" className="nav-item all-task active">
        <a href="#" className="nav-link">{props.title}</a>
      </li>
    </>

  )
}

export const App: React.FC = () => {
  React.useEffect(() => {
    const todo = () => {
      $(".todo-list .todo-item input").click(function () {
        if ($(this).is(":checked")) {
          $(this).parent().parent().parent().toggleClass("complete");
        } else {
          $(this).parent().parent().parent().toggleClass("complete");
        }
      });

      $(".todo-nav .all-task").click(function () {
        $(".todo-list").removeClass("only-active");
        $(".todo-list").removeClass("only-complete");
        $(".todo-nav li.active").removeClass("active");
        $(this).addClass("active");
      });

      $(".todo-nav .active-task").click(function () {
        $(".todo-list").removeClass("only-complete");
        $(".todo-list").addClass("only-active");
        $(".todo-nav li.active").removeClass("active");
        $(this).addClass("active");
      });

      $(".todo-nav .completed-task").click(function () {
        $(".todo-list").removeClass("only-active");
        $(".todo-list").addClass("only-complete");
        $(".todo-nav li.active").removeClass("active");
        $(this).addClass("active");
      });

      $("#uniform-all-complete input").click(function () {
        if ($(this).is(":checked")) {
          $(".todo-item .checker span:not(.checked) input").click();
        } else {
          $(".todo-item .checker span.checked input").click();
        }
      });

      $(".remove-todo-item").click(function () {
        $(this).parent().remove();
      });
    };

    todo();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 0) {
      $('<div class="todo-item"><div class="checker"><span class=""><input type="checkbox"></span></div> <span>' + e.currentTarget.value + '</span> <a href="javascript:void(0);" class="float-right remove-todo-item"><i class="icon-close"></i></a></div>').insertAfter('.todo-list .todo-item:last-child');
      e.currentTarget.value = "";
    } else if (e.key === 'Enter') {
      alert("Please enter a new task");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <form action="javascript:void(0);">
                  <input
                    type="text"
                    className="form-control add-task"
                    placeholder="New Task..."
                    onKeyPress={handleKeyPress}
                  />
                </form>
                <ul className="nav nav-pills todo-nav">
                  <MenuItem title="All" />
                  <MenuItem title="Active" />
                  <MenuItem title="Completed" />
                </ul>
                <div className="todo-list">
                  <ToDoItem title="Create Theme"/>
                  <ToDoItem title="Create Theme"/>
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

