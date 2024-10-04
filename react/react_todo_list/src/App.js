import { useEffect, useState } from 'react';
import './App.css';
import { InputForm } from './components/InputForm';
import { Title } from './components/Title';
import { TodoList } from './components/TodoList';

function App() {
  // 初期状態としてlocalStorageからデータを取得
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem('taskList');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // taskListが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);
  
  return (
    <div className="body">
      <Title />
      <InputForm taskList={taskList} setTaskList={setTaskList}/>
      <TodoList taskList={taskList} setTaskList={setTaskList}/>
    </div>
  );
}

export default App;
