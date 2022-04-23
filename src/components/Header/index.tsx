import Link from 'next/link'
import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import styles from './style.module.scss'

export function Header(){
    return (
    <header className={styles.headerConteiner}>
        <div className={styles.headerContent}>
            <img src="/images/logo.svg" alt="ig.news" />
            <nav>
               <ActiveLink href='/' activeClassName={styles.active}>
                 <a >Home</a>
                </ActiveLink>
                <ActiveLink href='/posts' activeClassName={styles.active}>
                   <a>Posts</a>
                </ActiveLink>
            </nav>
            <SignInButton/>

        </div>
    </header>
    )
}