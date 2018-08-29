import React, {Component} from "react";

export const createCategroy = (arr, action, visibility) => {
    return arr.map((item, index) => {
        return (
            <li
                key={`group-${index}`}
                onClick={action}
                data-visibility={`${index - 1}`}
                className={visibility === index - 1 ? "active" : ""}>
                <b>{item}</b>
                <div className="border-line" />
            </li>
        );
    });
};

export const RemoveBtn = ({id, name, action}) => {
    return (
        <button data-id={id} className={name} onClick={action}>
            x
        </button>
    );
};

export const LableItem = ({item, action}) => {
    return (
        <label className="checkbox-wrapper" htmlFor={`task-${item.id}`}>
            {item.value}
            <input
                id={`task-${item.id}`}
                type="checkbox"
                data-id={item.id}
                onChange={action}
                checked={+item.state > 0}
            />
            <span className="checkmark" />
        </label>
    );
};
