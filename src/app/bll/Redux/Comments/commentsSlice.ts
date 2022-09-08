import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { api } from "../../../api/api";
import { commentsAdapter } from "./commentsAdapter";

export const fetchComments = createAsyncThunk(
    "comments_slice/fetchComments",
    async (limit: string | null) => {
        const response = await api.get("/comments", {
            params: { _limit: limit || "0" },
        });
        const normalized = normalize<any, IComment[]>(response, {});

        return normalized.result.data;
    }
);
export const addComment = createAsyncThunk(
    "comments_slice/addComment",
    async (newObj: Omit<IComment, "id" | "postId">) => {
        const response = await api.post(`/comments/`, newObj);
        const normalized = normalize<any, {}>(response, {});
        // console.log({ normalized, response });
        return normalized.result.data;
    }
);
export const patchComment = createAsyncThunk(
    "comments_slice/patchComment",
    async ({ id, newObj }: IRequestParams) => {
        const response = await api.patch(`/comments/${id}`, newObj);
        const normalized = normalize<any, {}>(response, {});
        return normalized.result.data;
    }
);
export const deleteComment = createAsyncThunk(
    "comments_slice/deleteComment",
    async (id: number) => {
        await api.delete(`/comments/${id}`);
        return id;
    }
);

const commentsSlice = createSlice({
    name: "comments_slice",
    initialState: commentsAdapter.getInitialState({ loading: false }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            commentsAdapter.setAll(state, action.payload);
        });
        builder.addCase(deleteComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false;
            commentsAdapter.removeOne(state, action.payload);
        });
        builder.addCase(patchComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(patchComment.fulfilled, (state, action) => {
            state.loading = false;
            commentsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
        });
        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.loading = false;
            commentsAdapter.addOne(state, action.payload);
        });
    },
});

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IRequestParams {
    id: number;
    newObj: Partial<IComment>;
}

export default commentsSlice.reducer;
