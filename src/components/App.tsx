import React from "react";
import AsyncScript from "@/components/AsyncScript";

function App() {
    return (
        <div>
            Hello World!
            <AsyncScript src={"/js/hello-world.js"}></AsyncScript>
        </div>
    )
}

export default App;
