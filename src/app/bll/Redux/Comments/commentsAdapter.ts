import { createEntityAdapter } from "@reduxjs/toolkit";
import { IComment } from "./commentsSlice";

export const commentsAdapter = createEntityAdapter({
    selectId: (comment: IComment) => comment.id,
});
