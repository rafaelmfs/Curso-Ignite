import styles from './Header.module.css';
import logoIgnite from '../assets/Ignite-logo.svg'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={logoIgnite} alt="Logo do ignite" />
            <strong>Ignite Feed</strong>
        </header>
    )
}