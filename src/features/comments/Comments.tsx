import React, { useCallback, useEffect, useState, memo } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../app/bll/custom-hooks/hooks";
import {
    fetchComments,
    deleteComment,
    patchComment,
    IRequestParams,
    IComment,
    addComment,
} from "../../app/bll/Redux/Comments/commentsSlice";
import _ from "lodash";
import {
    Button,
    ButtonGroup,
    Form,
    Loader,
    PanelGroup,
    SelectPicker,
} from "rsuite";
import {
    selectAll,
    selectTotal,
} from "../../app/bll/Redux/Comments/defaultSelector";
import Comment from "./Components/Comment";
import selectIsLoading from "../../app/bll/Redux/Comments/selectIsLoading";

const Comments = () => {
    const dispatch = useAppDispatch();

    const [isAddFormShown, setIsAddFormShown] = useState<boolean>(false);
    const [limit, setLimit] = useState<string | null>("0");
    const [newComment, setNewComment] = useState<
        Omit<IComment, "id" | "postId">
    >({
        body: "",
        email: "",
        name: "",
    });

    useEffect(() => {
        dispatch(fetchComments(limit));
    }, [dispatch, limit]);
    const totalComments = useAppSelector(selectTotal);
    const allComments = useAppSelector(selectAll);

    const isLoading = useAppSelector(selectIsLoading);
    console.log(isLoading);

    const changeLimitHandler = (limit: string | null) => {
        setLimit(limit);
    };
    const deleteCommenthandler = useCallback(
        (id: number) => {
            dispatch(deleteComment(id));
        },
        [dispatch]
    );
    const patchCommenthandler = useCallback(
        ({ id, newObj }: IRequestParams) => {
            dispatch(patchComment({ id, newObj }));
        },
        [dispatch]
    );
    const addCommenthandler = useCallback(() => {
        dispatch(addComment(newComment));
    }, [dispatch, newComment]);

    const nameChangeHandler = (e: string) =>
        setNewComment({ ...newComment, name: e });
    const emailChangeHandler = (e: string) =>
        setNewComment({ ...newComment, email: e });
    const bodyChangeHandler = (e: string) =>
        setNewComment({ ...newComment, body: e });

    const selectValues = _.map(
        ["0", "10", "20", "30", "40", "50"],
        (option) => {
            return { label: option, value: option };
        }
    );
    return (
        <>
            <SelectPicker
                label="show by"
                data={selectValues}
                onChange={(e) => changeLimitHandler(e)}
            />
            <Button onClick={() => setIsAddFormShown(!isAddFormShown)}>
                {isAddFormShown ? "Close Form" : "Add Comment"}
            </Button>
            {isAddFormShown && (
                <Form
                    layout="inline"
                    onSubmit={(_, formContent) => {
                        console.log(formContent);
                    }}
                >
                    <Form.Group controlId="name">
                        <Form.ControlLabel>name</Form.ControlLabel>
                        <Form.Control
                            name="name"
                            onChange={nameChangeHandler}
                        ></Form.Control>
                        <Form.HelpText>Name is required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.ControlLabel>email</Form.ControlLabel>
                        <Form.Control
                            name="email"
                            type="email"
                            onChange={emailChangeHandler}
                        ></Form.Control>
                        <Form.HelpText>Email is required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="body">
                        <Form.ControlLabel>text</Form.ControlLabel>
                        <Form.Control
                            name="body"
                            onChange={bodyChangeHandler}
                        ></Form.Control>
                        <Form.HelpText>Text is required</Form.HelpText>
                    </Form.Group>
                    <ButtonGroup>
                        <Button
                            type="submit"
                            color="green"
                            appearance="primary"
                            onClick={addCommenthandler}
                        >
                            Submit
                        </Button>
                        <Button type="reset" color="red" appearance="primary">
                            Reset
                        </Button>
                    </ButtonGroup>
                </Form>
            )}
            <span>found: {totalComments}</span>

            {isLoading ? (
                <Loader center size="lg" />
            ) : (
                !_.isEmpty(allComments) && (
                    <PanelGroup>
                        {_.map(allComments, (comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                deleteComment={deleteCommenthandler}
                                patchComment={patchCommenthandler}
                            />
                        ))}
                    </PanelGroup>
                )
            )}
        </>
    );
};

export default memo(Comments);
