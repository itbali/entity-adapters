import React, { memo, useCallback } from "react";
import { Button, ButtonGroup, ButtonToolbar, Panel } from "rsuite";
import {
    IComment,
    IRequestParams,
    patchComment,
} from "../../../app/bll/Redux/Comments/commentsSlice";

const Comment = ({ comment, deleteComment, patchComment }: ICommentProps) => {
    const deleteCommentHandler = useCallback(() => {
        deleteComment(comment.id);
    }, [comment.id, deleteComment]);

    const patchCommentHandler = useCallback(() => {
        patchComment({
            id: comment.id,
            newObj: { body: "HARD CODE", name: `my name is ${comment.email}` },
        });
    }, [comment.id, patchComment]);

    return (
        <Panel
            header={
                <>
                    <h3>{comment.id}</h3>
                    <span>{comment.name}</span>
                </>
            }
            bordered
        >
            {comment.body}
            <ButtonToolbar>
                <ButtonGroup>
                    <Button
                        appearance="ghost"
                        color="red"
                        onClick={deleteCommentHandler}
                    >
                        Delete
                    </Button>
                    <Button appearance="ghost" onClick={patchCommentHandler}>
                        Change
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Panel>
    );
};

interface ICommentProps {
    comment: IComment;
    deleteComment: (id: number) => void;
    patchComment: ({ id, newObj }: IRequestParams) => void;
}
export default memo(Comment);
