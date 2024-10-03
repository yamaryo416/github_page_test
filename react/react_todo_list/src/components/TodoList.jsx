import React, { useState } from 'react'


export const TodoList = ({taskList, setTaskList}) => {
  // 編集中のタスクIDと編集テキストを管理
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const handleSave = (id) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          text: editingText,
        };
      }
      return task;
    });
    setTaskList(updatedTaskList);
    setEditingTask(null);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };


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

  // return (
  //   <div className="todoList">
  //     <div className="todos">
  //       {taskList.map((task, index) => (
  //         <div className={`todo${task.completed ? "completed" : ""}`} key={index}>
  //         <div className="todoText">
  //           <span>{task.text}</span>
  //         </div>
  //         <div className="icons">
  //           <input type="checkbox" checked={task.completed} onClick={() => handleCompleted(task.id)}/>
  //           <button className="edit">編集</button> 
  //           <button onClick={() => handleDelete(task.id)} className="delete">削除</button>
  //         </div>
  //       </div>
  //       ))}
        
  //     </div>
  //   </div>
  // )
  return (
    <div className="todoList">
      <div className="todos">
        {taskList.map((task) => (
          <div className={`todo ${task.completed ? "completed" : ""}`} key={task.id}>
            <div className="todoText">
              {editingTask === task.id ? (
                // 編集モードの入力フォーム
                <input
                  className='inputEdit'
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span>{task.text}</span>
              )}
            </div>
            <div className="icons">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleted(task.id)}
              />
              {editingTask === task.id ? (
                <button onClick={() => handleSave(task.id)} className="save">
                  保存
                </button>
              ) : (
                <button onClick={() => handleEdit(task)} className="edit">
                  編集
                </button>
              )}
              <button onClick={() => handleDelete(task.id)} className="delete">
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
