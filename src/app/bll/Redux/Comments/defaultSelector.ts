import { RootState } from "../store";
import { commentsAdapter } from "./commentsAdapter";

export const commentsSelector = commentsAdapter.getSelectors<RootState>(
    (state) => state.comments
);

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
    commentsSelector;
