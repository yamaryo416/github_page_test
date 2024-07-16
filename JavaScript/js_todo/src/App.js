// import { element, render } from "./view/html-util.js";

// export class App {
//   mount() {
//       const formElement = document.querySelector("#js-todo-create-form");
//       const inputElement = document.querySelector("#js-todo-create-input");
//       const containerElement = document.querySelector("#js-todo-container");
//       const todoAllCountElement = document.querySelector("#js-todo-all-count");
//       const todoCompletedCountElement = document.querySelector("#js-todo-completed-count");
//       const todoIncompletedCountElement = document.querySelector("#js-todo-incompleted-count");
//       // TodoリストをまとめるList要素
//       const todoListElement = document.createElement('ul');
//       // CSSスタイルを適用してリストスタイルを消す
//       todoListElement.style.listStyleType = 'none';
//       todoListElement.style.padding = '0';
//       todoListElement.style.margin = '0';

//       // Todoアイテム数
//       let todoAllCount = 0;
//       let todoCompletedCount = 0;
//       let todoIncompletedCount = 0;

//       // ローカルストレージからTodoリストを読み込む
//       const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//       savedTodos.forEach(todo => {
//         const todoItemElement = this.createTodoItem(todo.text, todo.completed);
//         todoListElement.appendChild(todoItemElement);
//         if (todo.completed) {
//           this.todoCompletedCount++;
//         } else {
//           this.todoIncompletedCount++;
//         }
//         todoAllCount++;
//       });

//       // カウントを更新
//       todoAllCountElement.textContent = `全てのタスク:${todoAllCount}`;
//       todoCompletedCountElement.textContent = `完了済み:${todoCompletedCount}`;
//       todoIncompletedCountElement.textContent = `未完了:${todoIncompletedCount}`;

//       // コンテナ要素にTodoリストを追加
//       containerElement.appendChild(todoListElement);

//       formElement.addEventListener("submit", (event) => {
//           // 本来のsubmitイベントの動作を止める
//           event.preventDefault();
//           // 追加するTodoアイテムの要素(li要素)を作成する
//           const todoText = inputElement.value;
//           const todoItemElement = this.createTodoItem(todoText, false);

//           // TodoアイテムをtodoListElementに追加する
//           todoListElement.appendChild(todoItemElement);

//           // ローカルストレージに保存
//           savedTodos.push({ text: todoText, completed: false });
//           localStorage.setItem('todos', JSON.stringify(savedTodos));

//           // Todoアイテム数を+1し、表示されてるテキストを更新する
//           todoAllCount += 1;
//           todoIncompletedCount += 1;
//           todoAllCountElement.textContent = `全てのタスク:${todoAllCount}`;
//           todoIncompletedCountElement.textContent = `未完了:${todoIncompletedCount}`;

//           // 入力欄を空文字列にしてリセットする
//           inputElement.value = "";
//       });
//   }

//   createTodoItem(text, completed) {
//       const todoItemElement = document.createElement('li');
//       todoItemElement.textContent = text;

//       // チェックボックスを作成
//       const checkbox = document.createElement('input');
//       checkbox.type = "checkbox";
//       checkbox.checked = completed;

//       // チェックボックスのイベントリスナーを追加
//       checkbox.addEventListener('change', (event) => {
//         const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//         const todoText = event.target.parentNode.textContent;
//         const todo = savedTodos.find(todo => todo.text === todoText);
//         todo.completed = event.target.checked;
//         localStorage.setItem('todos', JSON.stringify(savedTodos));
  
//         const todoCompletedCountElement = document.querySelector("#js-todo-completed-count");
//         const todoIncompletedCountElement = document.querySelector("#js-todo-incompleted-count");
  
//         if (event.target.checked) {
//           todoCompletedCountElement.textContent = `完了済み:${++this.todoCompletedCount}`;
//           todoIncompletedCountElement.textContent = `未完了:${--this.todoIncompletedCount}`;
//         } else {
//           todoCompletedCountElement.textContent = `完了済み:${--this.todoCompletedCount}`;
//           todoIncompletedCountElement.textContent = `未完了:${++this.todoIncompletedCount}`;
//         }
//       });

//       // チェックボックスをTodoアイテムに追加
//       todoItemElement.appendChild(checkbox);

//       return todoItemElement;
//   }
// }

import { element, render } from "./view/html-util.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.querySelector("#js-todo-create-form");
        const inputElement = document.querySelector("#js-todo-create-input");
        const containerElement = document.querySelector("#js-todo-container");
        const todoAllCountElement = document.querySelector("#js-todo-all-count");
        const todoCompletedCountElement = document.querySelector("#js-todo-completed-count");
        const todoIncompletedCountElement = document.querySelector("#js-todo-incompleted-count");
        
        const todoListElement = document.createElement('ul');
        todoListElement.style.listStyleType = 'none';
        todoListElement.style.padding = '0';
        todoListElement.style.margin = '0';

        // ローカルストレージからTodoリストを読み込む
        this.loadTodosFromLocalStorage();

        // モデルの変更を監視し、DOMを更新する
        this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getTodoItems();
            const todoItemCount = this.todoListModel.getTotalCount();
            const completedTodoCount = todoItems.filter(todo => todo.completed).length;
            const incompletedTodoCount = todoItemCount - completedTodoCount;

            todoAllCountElement.textContent = `全てのタスク:${todoItemCount}`;
            todoCompletedCountElement.textContent = `完了済み:${completedTodoCount}`;
            todoIncompletedCountElement.textContent = `未完了:${incompletedTodoCount}`;

            todoListElement.innerHTML = '';
            todoItems.forEach(todo => {
                const todoItemElement = this.createTodoItemElement(todo);
                todoListElement.appendChild(todoItemElement);
            });

            // 変更をローカルストレージに保存
            this.saveTodosToLocalStorage();
        });

        containerElement.appendChild(todoListElement);

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const todoText = inputElement.value;
            this.todoListModel.addTodo(new TodoItemModel({
                title: todoText,
                completed: false
            }));
            inputElement.value = "";
        });

        // 初期表示のためにモデルの変更を発生させる
        this.todoListModel.emitChange();
    }

    createTodoItemElement(todoItem) {
        const todoItemElement = document.createElement('li');
        todoItemElement.textContent = todoItem.title;

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = todoItem.completed;

        checkbox.addEventListener('change', () => {
            todoItem.completed = !todoItem.completed;
            this.todoListModel.emitChange();
        });

        const editButton = document.createElement('button');
          editButton.textContent = "編集";
          editButton.style.margin = "10px"; 
          editButton.addEventListener('click', () => {
          this.showEditForm(todoItem, todoItemElement);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "削除";
        deleteButton.addEventListener('click', () => {
            if (confirm("本当によろしいですか？")) {
                this.todoListModel.deleteTodo({
                    id: todoItem.id
                });
            }
        });

        todoItemElement.appendChild(checkbox);
        todoItemElement.appendChild(editButton);
        todoItemElement.appendChild(deleteButton);
        return todoItemElement;
    }

    showEditForm(todoItem, todoItemElement) {
      // フォームの作成
      const editForm = document.createElement('form');
  
      const editInput = document.createElement('input');
      editInput.type = "text";
      editInput.value = todoItem.title;
  
      const saveButton = document.createElement('button');
      saveButton.textContent = "保存";
  
      // フォームの送信イベント
      editForm.addEventListener('submit', (event) => {
          event.preventDefault();
          todoItem.title = editInput.value;
          this.todoListModel.emitChange();
      });
  
      // フォームに入力と保存ボタンを追加
      editForm.appendChild(editInput);
      editForm.appendChild(saveButton);
  
      // 元の要素を編集フォームに置き換え
      todoItemElement.innerHTML = '';
      todoItemElement.appendChild(editForm);
    }
  

    // ローカルストレージにTodoリストを保存するメソッド
    saveTodosToLocalStorage() {
        const todos = this.todoListModel.getTodoItems().map(item => ({
            id: item.id,
            title: item.title,
            completed: item.completed
        }));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // ローカルストレージからTodoリストを読み込むメソッド
    loadTodosFromLocalStorage() {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        savedTodos.forEach(todo => {
            this.todoListModel.addTodo(new TodoItemModel({
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }));
        });
    }
}