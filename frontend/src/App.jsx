import { useEffect, useState } from 'react'
import { createUser, getUsers, removeUser, updateUser } from './api/users'
import Header from './components/Header'
import AddUserPage from './pages/AddUserPage'
import AllUsersPage from './pages/AllUsersPage'
import DeleteUserPage from './pages/DeleteUserPage'
import UpdateUserPage from './pages/UpdateUserPage'
import './App.css'

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
            setUsers(await getUsers())
        } catch (loadError) {
            setError(loadError.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers(false)
    }, [])

    async function handleAdd(user) {
        await createUser(user)
        await loadUsers()
        setPage('all')
    }

    async function handleUpdate(user) {
        await updateUser(selectedId, user)
        await loadUsers()
        setPage('all')
    }

    async function handleDelete(user) {
        if (!window.confirm(`Delete ${user.name}?`)) return

        try {
            await removeUser(user._id)
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
            <Header page={page} onNavigate={choosePage} />
            <main>
                {error && <p className="banner error">{error}</p>}
                {page === 'all' && <AllUsersPage users={users} loading={loading} onRefresh={loadUsers} />}
                {page === 'add' && <AddUserPage onAdd={handleAdd} />}
                {page === 'update' && <UpdateUserPage users={users} selectedId={selectedId} onSelect={setSelectedId} onUpdate={handleUpdate} />}
                {page === 'delete' && <DeleteUserPage users={users} selectedId={selectedId} onSelect={setSelectedId} onDelete={handleDelete} />}
            </main>
        </div>
    )
}

export default App
