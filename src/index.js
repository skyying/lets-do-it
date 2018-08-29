import "./style/main.scss";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import icon from "./images/todo-design.png";
import {createCategroy, RemoveBtn, LableItem} from "./components/common.js";

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
        this.setTask = this.setTask.bind(this);
        this.setVisibility = this.setVisibility.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setCurrentTask = this.setCurrentTask.bind(this);
    }
    addTask() {
        let newTaskList = this.state.todo.slice();
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
    setTask(e) {
        let newTaskList = this.state.todo;
        newTaskList[e.currentTarget.dataset.id].state = !newTaskList[
            e.currentTarget.dataset.id
        ].state;
        this.setState({
            todo: newTaskList
        });
    }
    setVisibility(e) {
        this.setState({
            visibility: +e.currentTarget.dataset.visibility
        });
    }
    setCurrentTask(e) {
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

    render() {
        let todolist = this.state.todo;

        let todoTasks = this.state.todo.filter(task => {
            return +this.state.visibility >= 0
                ? +task.state === +this.state.visibility
                : true;
        });

        // set empty state

        let category = createCategroy(
            ["All", "Todos", "Done"],
            this.setVisibility,
            this.state.visibility,
        );

        let todos = todoTasks.map(item => {
            return (
                <div
                    data-id={item.id}
                    className={(
                        "task " + (item.state ? "completed-task" : "new-task")
                    ).trim()}
                    key={item.id}
                    onMouseEnter={this.setCurrentTask}
                    onMouseLeave={this.setCurrentTask}>
                    <span />
                    <div>
                        <LableItem item={item} action={this.setTask} />
                    </div>

                    <RemoveBtn
                        id={item.id}
                        action={this.deleteTask}
                        name={`remove ${
                            this.state.currentTask &&
                            this.state.currentTask == item.id
                                ? "show"
                                : ""
                        }`}
                    />
                </div>
            );
        });

        if (!todoTasks.length) {
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
                <div className="task-list" onMouseLeave={this.setCurrentTask}>
                    {todos}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
