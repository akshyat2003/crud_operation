import { useState } from 'react'

const emptyForm = { name: '', email: '' }

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

export default UserForm
