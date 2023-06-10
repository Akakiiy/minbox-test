import React, {useState} from 'react';
import './App.scss';

type Task = {
    id: number;
    text: string;
    completed: boolean;
}

type Filter = 'all' | 'completed' | 'uncompleted';

function App() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>('all');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleAddTask = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent page refresh
        if (input.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page refresh
        handleAddTask(event as unknown as React.MouseEvent); // typecast the FormEvent to MouseEvent
    };

    const handleToggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    };

    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter);
    };

    const handleClearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    const uncompletedTaskCount = tasks.filter(task => !task.completed).length;

    const filteredTasks = tasks.filter(task =>
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
    );

    return (
        <div className="Wrapper">
            <h1>todos</h1>
            <div className="App">
                <form onSubmit={handleFormSubmit}>
                    <div className="AddButton" onClick={handleAddTask} data-testid="add-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path d="M5 6l5 5 5-5z" fill="%23000000"/>
                        </svg>
                    </div>
                    <input value={input} onChange={handleInputChange} placeholder="What need to be done?" />
                </form>
                <ul>
                    {[...filteredTasks].reverse().map(task => (
                        <li
                            key={task.id}
                            onClick={() => handleToggleTaskCompletion(task.id)}
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            className={task.completed ? 'completed' : ''}
                        >
                            {task.text}
                        </li>
                    ))}
                </ul>
                <div>
                    <span>{uncompletedTaskCount} items left</span>
                    <div className={'filter'}>
                        <button
                            onClick={() => handleFilterChange('all')}
                            className={filter === 'all' ? 'active' : ''}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleFilterChange('completed')}
                            className={filter === 'completed' ? 'active' : ''}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => handleFilterChange('uncompleted')}
                            className={filter === 'uncompleted' ? 'active' : ''}
                        >
                            Uncompleted
                        </button>
                    </div>
                    <button onClick={handleClearCompleted}>Clear completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;
