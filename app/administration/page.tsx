"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getSession } from "@actions";
import { SessionData } from "@lib";

const AdminPage = () => {
  const [users, setUsers] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setSession(session);
      } catch (error) {
        console.error("Error setting session:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session || !session.isLoggedIn) {
        return;
      }

      try {
        const response = await axios.get('http://152.67.77.19:3000/auth/users', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const data = response.data;
        console.log(data);
  
        const filteredUsers = data.filter((user: SessionData) => !user.is_admin);
        setUsers(filteredUsers);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session]);

  const handleDelete = async (userId?: number) => {
    if (!session){
        return;
    }
    try {
      await axios.delete(`http://152.67.77.19:3000/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
