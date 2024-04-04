'use client'
import styles from './layout.module.css';
import { usePathname } from 'next/navigation';
import 'material-icons/iconfont/outlined.css';

export default function AuthenticatedLayout({ children }: {children: React.ReactNode}) {
    const currentPath = usePathname();
    const isActive = (pathname: string) => {
        return pathname === currentPath;
    };
    
    return (
        <div className={styles.mainContainer}>
            <nav id="topbar" className={styles.topbar}>
                <div id="topbar-left" className={styles.topbarLeft}>
                    <div id="logo" className={styles.logo}>Ascendable</div>
                    <div id="tabs" className={styles.tabs}>
                        <a href="/dashboard" className={isActive('/dashboard') ? styles.activeTab : styles.tab}>
                            <p className={styles.tabText}>Dashboard</p>
                        </a>
                        <a href="/flights" className={isActive('/flights') ? styles.activeTab : styles.tab}>
                            <p className={styles.tabText}>Flights</p>
                        </a>
                        <a href="/achievements" className={isActive('/achievements') ? styles.activeTab : styles.tab}>
                            <p className={styles.tabText}>Achievements</p>
                        </a>
                    </div>
                </div>
                <div id="topbar-right" className={styles.topbarRight}>
                    <button id="uploadButton" className={styles.navbarButton}><span className="material-icons-outlined">arrow_upward</span></button>
                    <button id="profileButton" className={styles.navbarButton}><span className="material-icons-outlined">person</span></button>
                </div>
            </nav>
            <div id="container" className={styles.container}>
                {children}
            </div>
            
{/* 
            <nav id="sidebar" className={styles.sidebar}>
                <a href="/"><h1 className={styles.logo}>Ascendable</h1></a>
                <a href="/dashboard" className={styles.menuItem}><span className="material-icons-outlined">space_dashboard</span><p className={styles.menuItemText}>Dashboard</p></a>
                <a href="/flights" className={styles.menuItem}><span className="material-icons-outlined">paragliding</span><p className={styles.menuItemText}>Flights</p></a>
                <a href="/achievements" className={styles.menuItem}><span className="material-icons-outlined">star_border</span><p className={styles.menuItemText}>Achievements</p></a>
            </nav>

            <div className="grid grid-rows-[64px_1fr]">
                <nav id="topbar" className={styles.topbar}>
                    
                    <button>Upload Flight</button>
                </nav>
                <div className={styles.container}> */}
                    {/* {children} */}
                {/* </div>
            </div> */}
        </div>
    )
}