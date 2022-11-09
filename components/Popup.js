import { useState } from 'react'

import Form from './Form'
import Response from './Response'

import styles from '../styles/Popup.module.scss'

function Popup({ togglePopup }) {
  const [isSuccess, setSuccess] = useState(false)

  return (
    <section
      className={styles.popup}
      onClick={() => togglePopup(false)}
    >
      <div
        className={styles.container}
        onClick={event => event.stopPropagation()}
      >
        <div className={`${styles.wrapper} ${isSuccess ? styles.success : ''}`}>
          <Form setSuccess={setSuccess} />
          <Response
            isSuccess={isSuccess}
            togglePopup={togglePopup}
          />
        </div>
      </div>
    </section>
  )
}

export default Popup
