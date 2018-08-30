import React, {Component} from "react";

export const createCategroy = (arr, action, visibility) => {
    return arr.map((item, index) => (
        <li
            key={`group-${index}`}
            onClick={action}
            data-visibility={`${index - 1}`}
            className={visibility === index - 1 ? "active" : ""}>
            <b>{item}</b>
            <div className="border-line" />
        </li>
    ));
};

export const RemoveBtn = ({id, name, action}) => (
    <button data-id={id} className={name} onClick={action}>
        x
    </button>
);

export const LableItem = ({item, action}) => (
    <label className="checkbox-wrapper" htmlFor={`task-${item.id}`}>
        {item.value}
        <input
            id={`task-${item.id}`}
            type="checkbox"
            data-id={item.id}
            onChange={action}
            checked={+item.isDone > 0}
        />
        <span className="checkmark" />
    </label>
);

export const randomLetter = () => {
    let letter = "abcdefghijklmnopqrstuvxyz";
    return letter[Math.floor(Math.random() * letter.length)];
};
