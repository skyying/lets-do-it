import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import icon from "./images/todo-design.png";
import {createCategroy, RemoveBtn, LableItem} from "./components/common.js";
import {createStore} from "redux";
import {todoReducer} from "./components/reducer.js";

let initialState = {
    todo: [],
    value: "",
    visibility: -1,
    currentTask: null
};

let store = createStore(todoReducer, initialState);

console.log(store.getState());
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
        // this.unSubscribe = this.unSubscribe.bind(this);
        // this.update = this.update.bind(this);
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
        store.dispatch({
            type: "ADD_TASK",
            add: list => {
                return [
                    ...list,
                    {
                        id: list.length,
                        state: false,
                        value: this.state.value
                    }
                ];
            }
        });
    }
    deleteTask(e) {
        let targetId = +e.currentTarget.dataset.id;
        store.dispatch({
            type: "DELETE_TASK",
            delete: list => {
                let index = list
                    .map((task, index) => task.id)
                    .indexOf(targetId);
                return [...list.slice(0, index), ...list.slice(index + 1)];
            }
        });
    }
    toggleTask(e) {
        let targetId = +e.currentTarget.dataset.id;
        store.dispatch({
            type: "TOGGLE_TASK",
            toggle: list => {
                let index = list
                    .map((task, index) => task.id)
                    .indexOf(targetId);
                let [copyTodo] = list.slice(index, index + 1);
                let newTodo = Object.assign({}, copyTodo, {
                    state: !copyTodo.state
                });
                return [
                    ...list.slice(0, index),
                    newTodo,
                    ...list.slice(index + 1)
                ];
            }
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
        console.log(this.state);
        let todolist = this.state.todo;

        let todoTasks = this.state.todo.filter(task => {
            return +this.state.visibility >= 0
                ? +task.state === +this.state.visibility
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
                        "task " + (item.state ? "completed-task" : "new-task")
                    ).trim()}
                    key={item.id}
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
