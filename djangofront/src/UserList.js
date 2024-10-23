import React, {useEffect, useState} from "react";
import axios from "axios";
import "./styles.css";

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({name: '', age: ''});
    const [editingUser, setEditingUser] = useState(null);

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
        if (editingUser) {
            setEditingUser({...editingUser, [event.target.name]: event.target.value});
        } else {
            setNewUser({...newUser, [event.target.name]: event.target.value});
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingUser) {
                await axios.put(
                    `http://localhost:8000/api/users/${editingUser.id}/`, editingUser
                );
                setUsers(
                    users.map((user) => user.id === editingUser.id ? editingUser : user)
                )
                setEditingUser(null);
            } else {
                const response = await axios.post('http://localhost:8000/api/users/create/', newUser);
                setUsers([...users, response.data]);
                setNewUser({name: '', age: ''});
            }
        } catch (error) {
            setError(error);
        }
    }

    const handleEdit = (user) => {
        setEditingUser({...user});
        setNewUser({name: '', age: ''});
    }

    const handleDelete = async (user) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${user.id}/`);
            setUsers(users.filter((u) => u.id !== user.id));
        } catch (error) {
            setError(error);
        }
    };

    if (loading) return <p className={"loading"}>Loading...</p>;
    if (error) return <p className={"error"}>Error: {error.message}</p>;

    return (
        <div className={"container mx-auto p-8"}>
            <table className={"table-auto w-full"}>
                <thead className={"bg-gray-200"}>
                <tr>
                    <th className={"px-4 py-2"}>ID</th>
                    <th className={"px-4 py-2"}>Nama</th>
                    <th className={"px-4 py-2"}>Umur</th>
                    <th className={"px-4 py-2"}>Edit User</th>
                </tr>
                </thead>
                <tbody className={"bg-white"}>
                {users.map(user => (
                    <tr key={user.id} className={"border-b border-gray-200"}>
                        <td className={"px-4 py-2"}>{user.id}</td>
                        <td className={"px-4 py-2"}>{user.name}</td>
                        <td className={"px-4 py-2"}>{user.age}</td>
                        <td className={"px-4 py-2"}>
                            <button onClick={() => handleEdit(user)}
                                    className={"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"}>Edit
                            </button>
                            <button onClick={() => handleDelete(user)}
                                    className={"bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className={"mt-8"}>
                <h2 className={"text-2xl font-semibold mb-2"}>{editingUser ? "edit user" : "tambahkan user"}</h2>
                <form onSubmit={handleSubmit} className={"space-y-4"}>
                    <label htmlFor={"name"} className={"block text-sm font-medium"}>
                        nama:
                        <input type={"text"} id={"name"} name={"name"}
                               value={editingUser ? editingUser.name : newUser.name} onChange={handleInputChange}
                               className={"border border-gray-300 p-2 rounded"}/>
                    </label>
                    <br/>
                    <label className={"block text-sm font-medium"}>
                        Umur:
                        <input type={"number"} id={"age"} name={"age"}
                               value={editingUser ? editingUser.age : newUser.age} onChange={handleInputChange}
                               className={"border border-gray-300 p-2 rounded"}/>
                    </label>
                    <br/>
                    <button type={"submit"}
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>{editingUser ? "Edit user" : "Tambahkan user"}
                    </button>
                    {editingUser && (
                        <button onClick={() => setEditingUser(null)}
                                className={"bg-gray-300 hover:bg-gray-800 font-bold py-2 px-4 rounded ml-2"}>Cancel</button>)}
                </form>
            </div>
        </div>
    );
}

export default UserList;