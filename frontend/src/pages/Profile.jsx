import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';


export default function Profile() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');


    const save = async () => {
        try {
            await userService.updateProfile({ name, bio });
            alert('Saved');
        } catch (err) { alert('Save failed'); }
    };


    return (
        <div className="profile-card">
            <h2>Profile</h2>
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} />
            <label>Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} />
            <button className="btn" onClick={save}>Save</button>
        </div>
    );
}