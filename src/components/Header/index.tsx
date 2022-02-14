import { SignInButton } from '../SignInButton'
import styles from './style.module.scss'

export function Header(){
    return (
    <header className={styles.headerConteiner}>
        <div className={styles.headerContent}>
            <img src="/images/logo.svg" alt="ig.news" />
            <nav>
                <a className={styles.active}>Home</a>
                <a>Post</a>
            </nav>
            <SignInButton/>

        </div>
    </header>
    )
}