import { Dictionary } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

import { Answer } from "../Answer/Answer"
import {
    addLike,
    selectCommentById
} from "./commentSlice";
import {
    selectAnswersByParent,
    AnswerData,
    addAnswer,
    selectAnswers
} from "../Answer/answerSlice"
import styles from "./Comment.module.css"

export function Comment(props: Dictionary<any>) {
    const data = useAppSelector((state) => selectCommentById(state, props.id));
    const answers = useAppSelector((state) => selectAnswersByParent(state, props.id));
    const allAnswers = useAppSelector((state) => selectAnswers(state));
    const dispatch = useAppDispatch();

    function likeComment() {
        dispatch(addLike(props.id));
        (document.getElementById("likeButton" + props.id) as HTMLInputElement).disabled = true;
    }

    function createAnswer() {
        let author = (document.getElementById("answerAuthor" + props.id) as HTMLInputElement).value;
        let text = (document.getElementById("answerText" + props.id) as HTMLInputElement).value;

        (document.getElementById("answerText" + props.id) as HTMLInputElement).value = "";

        dispatch(addAnswer({
            id: allAnswers.length,
            author,
            text,
            likes: 0,
            parent: props.id
        }))
    }

    return (
        <div className={styles.comment}>
            <p>
                Author: {data?.author}
            </p>
            <p>
                {data?.text}
            </p>
            <br />
            <label>{data?.likes} likes </label><button id={"likeButton" + props.id as string} onClick={() => likeComment()}>Like comment</button>
            {
                answers.map((answerData: AnswerData) => {
                    return <Answer key={answerData.id} id={answerData.id}/>;
                })
            }
            <div id={"answerContainer" + props.id as string} >
                <label>Answer comment</label><br />
                <label>Author:</label><br />
                <input type="text" id={"answerAuthor" + props.id}/><br />
                <label>Answer: </label><br />
                <textarea id={"answerText" + props.id}></textarea><br />
                <button onClick={() => createAnswer()}>Post answer</button>
            </div>
        </div>
    );
}