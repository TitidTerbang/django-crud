import React, {useEffect, useState} from "react";
import axios from "axios";
import "./styles.css";

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({name: '', age: ''});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/');
                setUsers(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (event) => {
        setNewUser({...newUser, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/create/', newUser);
            setUsers([...users, response.data]);
            setNewUser({name: '', age: ''});
        } catch (error) {
            setError(error);
        }
    }

    if (loading) return <p className={"loading"}>Loading...</p>;
    if (error) return <p className={"error"}>Error: {error.message}</p>;

    return (
        <div className={"container mx-auto p-8"}>
            <table className={"table-auto w-full"}>
                <thead className={"bg-gray-200"}>
                <tr>
                    <th className={"px-4 py-2"}>Nama</th>
                    <th className={"px-4 py-2"}>Umur</th>
                </tr>
                </thead>
                <tbody className={"bg-white"}>
                {users.map(user => (
                    <tr key={user.id} className={"border-b border-gray-200"}>
                        <td className={"px-4 py-2"}>{user.name}</td>
                        <td className={"px-4 py-2"}>{user.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className={"mt-8"}>
                <h2 className={"text-2xl font-semibold mb-2"}>Tambahkan User</h2>
                <form onSubmit={handleSubmit} className={"space-y-4"}>
                    <label className={"block text-sm font-medium"}>
                        nama:
                        <input type={"text"} name={"name"} value={newUser.name} onChange={handleInputChange} className={"border border-gray-300 p-2 rounded"}/>
                    </label>
                    <br/>
                    <label className={"block text-sm font-medium"}>
                        Umur:
                        <input type={"number"} name={"age"} value={newUser.age} onChange={handleInputChange} className={"border border-gray-300 p-2 rounded"}/>
                    </label>
                    <br/>
                    <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Add User</button>
                </form>
            </div>
        </div>
    );
}

export default UserList;