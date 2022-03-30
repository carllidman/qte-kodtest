import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { addAnswer, AnswerData } from '../Answer/answerSlice';
import { Comment } from '../Comment/Comment';
import { 
    CommentState, 
    CommentData,
    addComment
} from "../Comment/commentSlice";
import { selectComments } from '../Comment/commentSlice';
import styles from "./CommentContainer.module.css";

export function CommentContainer() {
    const comments = useAppSelector(selectComments);
    const dispatch = useAppDispatch();

    function createComment() {
        let author = (document.getElementById("authorInput") as HTMLInputElement).value;
        let text = (document.getElementById("textInput") as HTMLInputElement).value;

        (document.getElementById("textInput") as HTMLInputElement).value = "";
        
        let comment = {
            id: comments.length,
            author: author,
            text: text,
            likes: 0,
        }

        dispatch(addComment(comment));

        fetch("http://127.0.0.1:3000/api/add_comment", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetch("http://127.0.0.1:3000/api/get_data")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.comments)) {
                data.comments.forEach((comment: CommentData) => {
                    dispatch(addComment(comment))
                });
            }
            if (Array.isArray(data.answers)) {
                data.answers.forEach((answer: AnswerData) => {
                    dispatch(addAnswer(answer));
                });
            }
        });
    }, []);

    return (
        <div className={styles.commentContainer}>
            <h1>LIKE AND COMMENT</h1>
            {
                comments.map((commentData: CommentData) => {
                    return <Comment key={commentData.id} id={commentData.id}/>;
                })
            }
            <div>
                <label>Write a new comment</label><br />
                <label>Author:</label><br />
                <input type="text" id="authorInput"></input><br />
                <label>Comment text:</label><br />
                <textarea id="textInput"/><br />
                <button onClick={() => createComment()}>Post Comment</button>
            </div>
        </div>
    )
}