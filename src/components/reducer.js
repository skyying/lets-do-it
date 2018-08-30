export const todoReducer = (state, action) => {
    switch (action.type) {
            case "ADD_TASK":
                return Object.assign({}, state, {
                    todo: [
                        ...state.todo,
                        {
                            id: state.todo.length,
                            isDone: false,
                            value: state.value
                        }
                    ],
                    value: ""
                });
            case "DELETE_TASK":
                return Object.assign({}, state, {
                    todo: [
                        ...state.todo.slice(
                            0,
                            getTargetIndex(state.todo, action.id),
                        ),
                        ...state.todo.slice(
                            getTargetIndex(state.todo, action.id) + 1,
                        )
                    ]
                });
            case "TOGGLE_TASK": {
                let index = getTargetIndex(state.todo, action.id);
                let targetTodo = Object.assign({}, state.todo[index], {
                    isDone: !state.todo[index].isDone
                });
                return Object.assign({}, state, {
                    todo: [
                        ...state.todo.slice(0, index),
                        targetTodo,
                        ...state.todo.slice(index + 1)
                    ]
                });
            }
            case "SWITCH_VISIBILITY":
                return Object.assign({}, state, {visibility: action.visibility});
            case "UPDATE_VALUE":
                return Object.assign({}, state, {value: action.value});
            case "SET_CURRENT_TASK":
                return Object.assign({}, state, {currentTask: action.id});
            default:
                return state;
    }
};

const getTargetIndex = (arr, targetId) =>
    arr.map(task => task.id).indexOf(targetId);
