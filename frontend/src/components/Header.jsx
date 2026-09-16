const navigation = [
    ['all', 'All users'],
    ['add', 'Add user'],
    ['update', 'Update'],
    ['delete', 'Delete'],
]

function Header({ page, onNavigate }) {
    return (
        <header className="header">
            <div>
                <p className="eyebrow">USER DIRECTORY</p>
                <h1>People</h1>
            </div>
            <nav aria-label="User actions">
                {navigation.map(([key, label]) => (
                    <button
                        className={page === key ? 'nav-button active' : 'nav-button'}
                        key={key}
                        onClick={() => onNavigate(key)}
                        type="button"
                    >
                        {label}
                    </button>
                ))}
            </nav>
        </header>
    )
}

export default Header
