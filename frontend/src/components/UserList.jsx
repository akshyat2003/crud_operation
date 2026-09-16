function UserList({ users, loading, onRefresh }) {
    return (
        <section>
            <div className="section-heading">
                <div><p className="eyebrow">DIRECTORY</p><h2>All users</h2></div>
                <button className="button" onClick={onRefresh} type="button">Refresh</button>
            </div>
            {loading ? <p className="muted">Loading users...</p> : users.length === 0 ? <p className="empty">No users yet. Add the first one.</p> : (
                <div className="user-list">
                    {users.map((user) => (
                        <article className="user-row" key={user._id}>
                            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                            <div><strong>{user.name}</strong><p>{user.email}</p></div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default UserList
