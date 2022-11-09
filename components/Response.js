import Button from './Button'

import styles from '../styles/Response.module.scss'

function Response({ isSuccess, togglePopup }) {
  return (
    <div className={styles.response}>
      <div className={styles.message}>
        <h2>All done!</h2>
        <p>
          You will be one of the first to experience Broccoli & Co. when we launch.
        </p>
      </div>

      <Button
        text="OK"
        tabIndex={isSuccess ? '7' : '-1'}
        onPress={() => togglePopup(false)}
      />
    </div>
  )
}

export default Response
