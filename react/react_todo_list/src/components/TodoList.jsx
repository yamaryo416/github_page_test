import React from 'react'


export const TodoList = ({taskList, setTaskList}) => {
  const handleDelete = (id) => {
    /* タスクを削除する　*/
    setTaskList(taskList.filter((task) => task.id !== id));
  }

  const handleCompleted = (id) => {
    // 完了か未完了かを判断する
    const updatedTaskList = taskList.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  return (
    <div className="todoList">
      <div className="todos">
        {taskList.map((task, index) => (
          <div className={`todo${task.completed ? "completed" : ""}`} key={index}>
          <div className="todoText">
            <span>{task.text}</span>
          </div>
          <div className="icons">
            <input type="checkbox" checked={task.completed} onClick={() => handleCompleted(task.id)}/>
            <button className="edit">編集</button>
            <button onClick={() => handleDelete(task.id)} className="delete">削除</button>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  )
}
