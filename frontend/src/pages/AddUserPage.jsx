import UserForm from '../components/UserForm'

function AddUserPage({ onAdd }) {
    return <UserForm title="Add a user" submitLabel="Create user" onSubmit={onAdd} />
}

export default AddUserPage
