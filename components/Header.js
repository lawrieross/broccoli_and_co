import styles from '../styles/Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <a
          href="/"
          tabIndex="1"
          className='logo'
        >
          Broccoli & Co.
        </a>
      </nav>
    </header>
  )
}

export default Header
