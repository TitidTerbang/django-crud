import React from "react";
import UserList from "./UserList";
import "./styles.css";

function App() {
    return (
        <div>
            <div className={"bg-gray-200 p-4 text-center"}>
                <h1 className={"text-2xl font-semibold mb-2"}>Daftar User</h1>
            </div>
            <UserList/>
        </div>
    );
}

export default App;