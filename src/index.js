import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import icon from "./images/todo-design.png";
import {
    randomLetter,
    createCategroy,
    RemoveBtn,
    LableItem
} from "./components/common.js";
import {createStore} from "redux";
import {todoReducer} from "./components/reducer.js";

let initialState = {
    todo: [],
    value: "",
    visibility: -1,
    currentTask: null
};

let store = createStore(todoReducer, initialState);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setVisibility = this.setVisibility.bind(this);
        this.setCurrentTask = this.setCurrentTask.bind(this);
    }
    componentDidMount() {
        this.unSubscribe = store.subscribe(this.update.bind(this));
    }
    componentDidUnMount() {
        this.unSubscribe();
    }
    update() {
        this.setState(store.getState());
    }
    addTask() {
        store.dispatch({type: "ADD_TASK"});
    }
    deleteTask(e) {
        store.dispatch({
            type: "DELETE_TASK",
            id: +e.currentTarget.dataset.id
        });
    }
    toggleTask(e) {
        store.dispatch({
            type: "TOGGLE_TASK",
            id: +e.currentTarget.dataset.id
        });
    }
    setVisibility(e) {
        store.dispatch({
            type: "SWITCH_VISIBILITY",
            visibility: +e.currentTarget.dataset.visibility
        });
    }
    setCurrentTask(e) {
        store.dispatch({
            type: "SET_CURRENT_TASK",
            id: e.currentTarget.dataset.id
        });
    }
    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.addTask();
        }
    }
    handleChange(e) {
        store.dispatch({
            type: "UPDATE_VALUE",
            value: e.currentTarget.value
        });
    }
    render() {
        let todolist = this.state.todo;
        let todoTasks = this.state.todo.filter(task => {
            return this.state.visibility >= 0
                ? +task.isDone === this.state.visibility
                : true;
        });

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
                        "task " + (item.isDone ? "completed-task" : "new-task")
                    ).trim()}
                    key={`todo-${item.id + randomLetter()}`}
                    onMouseEnter={this.setCurrentTask}
                    onMouseLeave={this.setCurrentTask}>
                    <span />
                    <div>
                        <LableItem item={item} action={this.toggleTask} />
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
