import React, {useEffect, useState} from "react";
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {users.map(user => (
                <h1>
                    <li>Nama Umur</li>
                    <li key={user.id}>{user.name} {user.age}</li>
                </h1>
            ))}
        </ul>
    );
}

export default UserList;