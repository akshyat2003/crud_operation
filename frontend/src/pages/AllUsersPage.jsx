import UserList from '../components/UserList'

function AllUsersPage({ users, loading, onRefresh }) {
    return <UserList users={users} loading={loading} onRefresh={onRefresh} />
}

export default AllUsersPage
