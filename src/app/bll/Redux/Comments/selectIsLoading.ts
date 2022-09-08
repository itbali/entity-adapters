import { createSelector } from "@reduxjs/toolkit";
import selectCommentsState from "./selectCommentsState";

const selectIsLoading = createSelector(
    selectCommentsState,
    (state) => state.loading
);
export default selectIsLoading;
