export const todoReducer = (state, action) => {
    switch (action.type) {
    case "ADD_TASK":
        return Object.assign({}, state, {todo: action.add(state.todo)});
    case "DELETE_TASK":
        return Object.assign({}, state, {todo: action.delete(state.todo)});
    case "TOGGLE_TASK":
        return Object.assign({}, state, {todo: action.toggle(state.todo)});
    default:
        return state;
    }
};
