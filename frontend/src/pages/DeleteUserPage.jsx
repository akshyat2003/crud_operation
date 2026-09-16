function DeleteUserPage({ users, selectedId, onSelect, onDelete }) {
    const selectedUser = users.find((user) => user._id === selectedId)

    return (
        <section>
            <div className="section-heading"><div><p className="eyebrow">REMOVE RECORD</p><h2>Delete a user</h2></div></div>
            <select className="user-select" value={selectedId} onChange={(event) => onSelect(event.target.value)}>
                <option value="">Choose a user</option>
                {users.map((user) => <option key={user._id} value={user._id}>{user.name} ({user.email})</option>)}
            </select>
            {selectedUser && <div className="delete-panel"><p>You are about to permanently remove <strong>{selectedUser.name}</strong>.</p><button className="button danger" onClick={() => onDelete(selectedUser)} type="button">Delete user</button></div>}
        </section>
    )
}

export default DeleteUserPage
