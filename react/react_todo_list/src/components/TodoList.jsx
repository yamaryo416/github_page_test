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
    // 確認ダイアログを表示し、OKなら削除を実行する
    if (window.confirm("本当に削除してもよろしいですか？")) {
      setTaskList(taskList.filter((task) => task.id !== id));
    }
  };

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

  // タスクの集計を行う
  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((task) => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

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
      <div className="taskSummary">
        <p>全てのタスク: {totalTasks}<br />
          完了済み: {completedTasks}<br />
          未完了: {incompleteTasks}<br />
        </p>
      </div>
    </div>
  );
};
