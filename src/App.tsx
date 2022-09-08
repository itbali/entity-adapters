import React from "react";
import { CustomProvider, Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Comments from "./features/comments/Comments";

const App = () => {
    return (
        <CustomProvider theme="dark">
            <Comments />
        </CustomProvider>
    );
};

export default App;
