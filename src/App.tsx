import React, { useState } from 'react';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<'all' | TaskStatus>('all');

  // タスク追加
  // コンポーネントの定義
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) {
      setErrorMessage('タスク名を入力してください');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: inputTitle.trim(),
      status: 'todo',
    };

    setTasks([...tasks, newTask]);
    setInputTitle('');
    setErrorMessage('');
  };

  // ステータス更新
  const handleStatusChange = (id: number, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // タスク削除
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // フィルター
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">タスク管理 (E2E予行演習)</h1>

        {/* フォーム */}
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              data-testid="task-input"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="新しいタスクを入力..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              data-testid="add-task-button"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              追加
            </button>
          </div>
          {errorMessage && (
            <p data-testid="error-message" className="text-red-500 text-sm">
              {errorMessage}
            </p>
          )}
        </form>

        {/* フィルター */}
        <div className="flex items-center justify-between mb-4 border-b pb-4">
          <span className="text-sm font-medium text-gray-600">表示フィルター:</span>
          <select
            data-testid="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | TaskStatus)}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none"
          >
            <option value="all">すべて</option>
            <option value="todo">未着手</option>
            <option value="in-progress">進行中</option>
            <option value="done">完了</option>
          </select>
        </div>

        {/* 一覧 */}
        <ul className="space-y-3">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-500 py-4">タスクがありません</li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                data-testid={`task-item-${task.id}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
              >
                <span
                  data-testid={`task-title-${task.id}`}
                  className={`font-medium ${
                    task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center gap-2">
                  <select
                    data-testid={`task-status-select-${task.id}`}
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value as TaskStatus)
                    }
                    className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none"
                  >
                    <option value="todo">未着手</option>
                    <option value="in-progress">進行中</option>
                    <option value="done">完了</option>
                  </select>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    data-testid={`delete-task-button-${task.id}`}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;