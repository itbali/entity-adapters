import { RootState } from "../store";

const selectCommentsState = (state: RootState) => state.comments;
export default selectCommentsState;
