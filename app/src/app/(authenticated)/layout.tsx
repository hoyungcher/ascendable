import styles from './layout.module.css'

export default function AuthenticatedLayout({ children }: {children: React.ReactNode}) {
    return (
        <div className={styles.mainContainer}>
            <nav id="topbar" className={styles.topbar}>
                <a href="/"><h1 className={styles.logo}>Ascendable</h1></a>
                <button>Upload Flight</button>
            </nav>
            <div className="grid grid-cols-[160px_1fr]">
                <nav id="sidebar" className={styles.sidebar}>
                    <a href="/dashboard" className={styles.menuItem}>Dashboard</a>
                    <a href="/flights" className={styles.menuItem}>Flights</a>
                    <a href="/achievements" className={styles.menuItem}>Achievements</a>
                </nav>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </div>
    )
}