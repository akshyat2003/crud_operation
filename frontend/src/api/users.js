const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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

export function getUsers() {
    return request('/users')
}

export function createUser(user) {
    return request('/users', { method: 'POST', body: JSON.stringify(user) })
}

export function updateUser(id, user) {
    return request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) })
}

export function removeUser(id) {
    return request(`/users/${id}`, { method: 'DELETE' })
}
