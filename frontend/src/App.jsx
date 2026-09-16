import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const emptyForm = { name: '', email: '' }

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || 'Something went wrong')
    }

    return response.status === 204 ? null : response.json()
}

function UserForm({ title, submitLabel, initialValues = emptyForm, onSubmit }) {
    const [form, setForm] = useState(initialValues)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        setSaving(true)
        setError('')

        try {
            await onSubmit(form)
            setForm(emptyForm)
        } catch (submitError) {
            setError(submitError.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <section className="form-panel">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input required minLength="2" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Ada Lovelace" />
                </label>
                <label>
                    Email
                    <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="ada@example.com" />
                </label>
                {error && <p className="error">{error}</p>}
                <button className="button primary" type="submit" disabled={saving}>
                    {saving ? 'Saving...' : submitLabel}
                </button>
            </form>
        </section>
    )
}

function App() {
    const [page, setPage] = useState('all')
    const [users, setUsers] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function loadUsers(showLoading = true) {
        if (showLoading) setLoading(true)
        setError('')
        try {
            setUsers(await request('/users'))
        } catch (loadError) {
            setError(loadError.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers(false)
    }, [])

    const selectedUser = users.find((user) => user._id === selectedId)

    async function addUser(form) {
        await request('/users', { method: 'POST', body: JSON.stringify(form) })
        await loadUsers()
        setPage('all')
    }

    async function updateUser(form) {
        await request(`/users/${selectedId}`, { method: 'PUT', body: JSON.stringify(form) })
        await loadUsers()
        setPage('all')
    }

    async function deleteUser() {
        if (!selectedUser || !window.confirm(`Delete ${selectedUser.name}?`)) return

        try {
            await request(`/users/${selectedId}`, { method: 'DELETE' })
            setSelectedId('')
            await loadUsers()
            setPage('all')
        } catch (deleteError) {
            setError(deleteError.message)
        }
    }

    function choosePage(nextPage) {
        setError('')
        setPage(nextPage)
    }

    return (
        <div className="app-shell">
            <header className="header">
                <div>
                    <p className="eyebrow">USER DIRECTORY</p>
                    <h1>People</h1>
                </div>
                <nav aria-label="User actions">
                    {[['all', 'All users'], ['add', 'Add user'], ['update', 'Update'], ['delete', 'Delete']].map(([key, label]) => (
                        <button className={page === key ? 'nav-button active' : 'nav-button'} key={key} onClick={() => choosePage(key)} type="button">
                            {label}
                        </button>
                    ))}
                </nav>
            </header>

            <main>
                {error && <p className="banner error">{error}</p>}

                {page === 'all' && (
                    <section>
                        <div className="section-heading">
                            <div><p className="eyebrow">DIRECTORY</p><h2>All users</h2></div>
                            <button className="button" onClick={loadUsers} type="button">Refresh</button>
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
                )}

                {page === 'add' && <UserForm title="Add a user" submitLabel="Create user" onSubmit={addUser} />}

                {page === 'update' && (
                    <section>
                        <div className="section-heading"><div><p className="eyebrow">EDIT RECORD</p><h2>Update a user</h2></div></div>
                        <select className="user-select" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
                            <option value="">Choose a user</option>
                            {users.map((user) => <option key={user._id} value={user._id}>{user.name} ({user.email})</option>)}
                        </select>
                        {selectedUser && <UserForm key={selectedId} title="User details" submitLabel="Save changes" initialValues={{ name: selectedUser.name, email: selectedUser.email }} onSubmit={updateUser} />}
                    </section>
                )}

                {page === 'delete' && (
                    <section>
                        <div className="section-heading"><div><p className="eyebrow">REMOVE RECORD</p><h2>Delete a user</h2></div></div>
                        <select className="user-select" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
                            <option value="">Choose a user</option>
                            {users.map((user) => <option key={user._id} value={user._id}>{user.name} ({user.email})</option>)}
                        </select>
                        {selectedUser && <div className="delete-panel"><p>You are about to permanently remove <strong>{selectedUser.name}</strong>.</p><button className="button danger" onClick={deleteUser} type="button">Delete user</button></div>}
                    </section>
                )}
            </main>
        </div>
    )
}

export default App
