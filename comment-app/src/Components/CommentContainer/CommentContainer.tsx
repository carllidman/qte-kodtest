import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

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
        
        dispatch(addComment({
            id: comments.length,
            author: author,
            text: text,
            likes: 0,
            answers: []
        }));
    }

    return (
        <div className={styles.commentContainer}>
            <h1>LIKE AND COMMENT</h1>
            {
                comments.map((commentData: CommentData) => {
                    return <Comment key={commentData.id} id={commentData.id}/>;
                })
            }
            <div>
                <label>Author:</label><br />
                <input type="text" id="authorInput"></input><br />
                <label>Comment text:</label><br />
                <textarea id="textInput"/><br />
                <button onClick={() => createComment()}>Post Comment</button>
            </div>
        </div>
    )
}