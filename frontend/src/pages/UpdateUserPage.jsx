import UserForm from '../components/UserForm'

function UpdateUserPage({ users, selectedId, onSelect, onUpdate }) {
    const selectedUser = users.find((user) => user._id === selectedId)

    return (
        <section>
            <div className="section-heading"><div><p className="eyebrow">EDIT RECORD</p><h2>Update a user</h2></div></div>
            <select className="user-select" value={selectedId} onChange={(event) => onSelect(event.target.value)}>
                <option value="">Choose a user</option>
                {users.map((user) => <option key={user._id} value={user._id}>{user.name} ({user.email})</option>)}
            </select>
            {selectedUser && <UserForm key={selectedId} title="User details" submitLabel="Save changes" initialValues={{ name: selectedUser.name, email: selectedUser.email }} onSubmit={onUpdate} />}
        </section>
    )
}

export default UpdateUserPage
