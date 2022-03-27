import { Dictionary } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
    addLike,
    selectAnswerById
} from "./answerSlice";
import styles from "./Answer.module.css";

export function Answer(props: Dictionary<any>) {
    let data = useAppSelector((state) => selectAnswerById(state, props.id));
    const dispatch = useAppDispatch();

    function likeAnswer() {
        dispatch(addLike(props.id));
        (document.getElementById("likeAnswerButton" + props.id) as HTMLInputElement).disabled = true;
    }

    return(
        <div className={styles.answer}>
            <p>
                Author: {data?.author}
            </p>
            <p>
                {data?.text}
            </p>
            <label>{data?.likes} likes </label><button id={"likeAnswerButton" + props.id as string} onClick={() => likeAnswer()}>Like answer</button>
        </div>
    )
}