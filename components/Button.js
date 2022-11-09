import styles from '../styles/Button.module.scss'

function Button(props) {
  const {
    disabled,
    onPress,
    tabIndex,
    text,
    type
  } = props

  return (
    <button
      tabIndex={tabIndex}
      className={styles.button}
      type={type}
      disabled={disabled}
      data-text={text}
      onClick={onPress}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  disabled: false
}

export default Button
