import "./style/main.scss";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import icon from "./images/todo-design.png";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [],
            value: "",
            visibility: -1,
            currentTask: null
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setTodo = this.setTodo.bind(this);
        this.setVisibility = this.setVisibility.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setEnterTaskArea = this.setEnterTaskArea.bind(this);
    }
    addTask() {
        let newTaskList = this.state.todo;
        let task = {
            id: newTaskList.length,
            state: false,
            value: this.state.value
        };
        newTaskList.push(task);
        this.setState({
            value: "",
            todo: newTaskList,
            visibility:
                this.state.visibility === 1 ? -1 : this.state.visibility
        });
    }
    deleteTask(e) {
        let newTaskList = this.state.todo.slice();
        newTaskList.splice(e.currentTarget.dataset.id, 1);
        this.setState({
            todo: newTaskList.map((item, index) =>
                Object.assign(item, {id: index}),
            )
        });
    }
    setTodo(e) {
        let newTaskList = this.state.todo;
        newTaskList[e.currentTarget.dataset.id].state = !newTaskList[
            e.currentTarget.dataset.id
        ].state;
        this.setState({
            todo: newTaskList
        });
    }
    setEnterTaskArea(e) {
        this.setState({
            currentTask: e.currentTarget.dataset.id
        });
    }
    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.addTask();
        }
    }
    handleChange(e) {
        this.setState({
            value: e.currentTarget.value
        });
    }
    setVisibility(e) {
        this.setState({
            visibility: +e.currentTarget.dataset.visibility
        });
    }
    render() {
        console.log(this.state);

        let todolist = this.state.todo;

        // let sorted = Object.keys(todolist).sort((a, b) => +b.state - +a.state);

        let todoTasks = this.state.todo.filter(task => {
            return +this.state.visibility >= 0
                ? +task.state === +this.state.visibility
                : true;
        });

        let category = ["All", "Todos", "Done"].map((item, index) => {
            return (
                <li
                    key={`group-${index}`}
                    onClick={this.setVisibility}
                    data-visibility={`${index - 1}`}
                    className={
                        +this.state.visibility === index - 1 ? "active" : ""
                    }>
                    <b>{item}</b>
                    <div className="border-line" />
                </li>
            );
        });

        let todos = todoTasks.map(item => {
            return (
                <div
                    data-id={item.id}
                    className={(
                        "task " + (item.state ? "completed-task" : "new-task")
                    ).trim()}
                    key={item.id}
                    onMouseEnter={this.setEnterTaskArea}
                    onMouseLeave={this.setEnterTaskArea}>
                    <span />
                    <div>
                        <label
                            className="checkbox-wrapper"
                            htmlFor={`task-${item.id}`}>
                            {item.value}
                            <input
                                id={`task-${item.id}`}
                                type="checkbox"
                                data-id={item.id}
                                onChange={this.setTodo}
                                checked={+item.state > 0}
                            />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <button
                        data-id={item.id}
                        className={`remove ${
                            this.state.currentTask &&
                            this.state.currentTask == item.id
                                ? "show"
                                : ""
                        }`}
                        onClick={this.deleteTask}>
                        x
                    </button>
                </div>
            );
        });
        if (!todos.length) {
            todos = (
                <div className="empty">
                    <img src={icon} />
                    <p>
                        You have no tasks to do!<br />
                        Enjoy your <b>homework</b>!
                    </p>
                </div>
            );
        }

        return (
            <div>
                <nav>{category}</nav>
                <div className="add-section">
                    <input
                        placeholder="Add a new task"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        type="text"
                    />
                    <button
                        onClick={this.addTask}
                        disabled={!this.state.value.length}>
                        <span>+</span>
                    </button>
                </div>
                <div className="task-list" onMouseLeave={this.setEnterTaskArea}>
                    {todos}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
