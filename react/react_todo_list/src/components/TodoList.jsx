import React from 'react'


export const TodoList = ({taskList, setTaskList}) => {
  const handleDelete = (id) => {
    /* タスクを削除する　*/
    setTaskList(taskList.filter((task) => task.id !== id));
  }

  return (
    <div className="todoList">
      <div className="todos">
        {taskList.map((task, index) => (
          <div className="todo" key={index}>
          <div className="todoText">
            <span>{task.text}</span>
          </div>
          <div className="icons">
            <input type="checkbox" />
            <button className="edit">編集</button>
            <button onClick={() => handleDelete(task.id)} className="delete">削除</button>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  )
}
