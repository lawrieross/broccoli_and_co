import { useState, useEffect } from 'react'

import Button from './Button'

import styles from '../styles/Form.module.scss'

function Form({ setSuccess }) {
  const API_HEADER = '//us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth'

  const [isSending, sendRequest] = useState(false)
  const [isFormValid, setFormValid] = useState(false)
  const [formValidationMessage, setFormValidationMessage] = useState('')
  const [inputs, setInputs] = useState({
    confirmation: { value: '', message: '', valid: false },
    email: { value: '', message: '', valid: false },
    fullname: { value: '', message: '', valid: false }
  })

  useEffect(() => {
    setFormValid(Object.keys(inputs).every(key => inputs[key].valid))
  }, [inputs, formValidationMessage])

  const getFullnameMessage = value => {
    return value.length < 3 ? 'Full name needs to be at least 3 characters long' : ''
  }

  const getEmailMessage = value => {
    const validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    return validation ? '' : 'Ensure email is in the correct format'
  }

  const getEmailConfirmationMessage = value => {
    return !value || value !== inputs.email.value ? 'Ensure email fields match and are in the correct format' : ''
  }

  const getErrorMessage = (name, value) => {
    return {
      confirmation: getEmailConfirmationMessage(value),
      email: getEmailMessage(value),
      fullname: getFullnameMessage(value)
    }[name]
  }

  const setErrorMessages = () => {
    const confirmationMessage = getEmailConfirmationMessage(inputs.confirmation.value)
    const emailMessage = getEmailMessage(inputs.email.value)
    const fullnameMessage = getFullnameMessage(inputs.fullname.value)

    setInputs({
      confirmation: {
        ...inputs.confirmation,
        message: confirmationMessage,
        valid: !confirmationMessage
      },
      email: {
        ...inputs.email,
        message: emailMessage,
        valid: !emailMessage
      },
      fullname: {
        ...inputs.fullname,
        message: fullnameMessage,
        valid: !fullnameMessage
      }
    })
  }

  const getErrorMessages = () => {
    setErrorMessages()
    setFormValidationMessage('Ensure all fields are valid')
    const timer = setTimeout(() => {
      setFormValidationMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    const message =  getErrorMessage(name, value)
    setInputs({
      ...inputs,
      [name]: { value, message, valid: !message }
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    // Show form validation error message
    if (!isFormValid) return getErrorMessages()

    // Show request feedback upon completion
    sendRequest(true)

    const data = {
      name: inputs.fullname.value,
      email: inputs.email.value
    }
    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSONdata
    }

    await fetch(API_HEADER, options)
      .then((response) => {
        sendRequest(false)
        if (response.status === 200) {
          setSuccess(true)
        }

        if (response.status === 400) {
          response.json()
            .then(({ errorMessage }) => {
              setFormValidationMessage(errorMessage)
              const timer = setTimeout(() => {
                setFormValidationMessage('')
              }, 3000)
              return () => clearTimeout(timer)
            })
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div className={styles.form}>
      <h2>Request an invite</h2>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <div className={`${styles.input} ${!!inputs.fullname.message ? styles.error : ''}`}>
            <input
              tabIndex="3"
              aria-invalid={!inputs.fullname.valid}
              type="text"
              name="fullname"
              placeholder="Full name"
              onChange={handleChange}
              autoFocus
            />

            <span className={`${styles.message} ${!!inputs.fullname.message ? styles['show-message'] : ''}`}>
              {inputs.fullname.message}
            </span>
          </div>

          <div className={`${styles.input} ${!!inputs.email.message ? styles.error : ''}`}>
            <input
              tabIndex="4"
              aria-invalid={!inputs.email.valid}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <span className={`${styles.message} ${!!inputs.email.message ? styles['show-message'] : ''}`}>
              {inputs.email.message}
            </span>
          </div>

          <div className={`${styles.input} ${!!inputs.confirmation.message ? styles.error : ''}`}>
            <input
              tabIndex="5"
              aria-invalid={!inputs.confirmation.valid}
              type="email"
              name="confirmation"
              placeholder="Confirm email"
              onChange={handleChange}
            />

            <span className={`${styles.message} ${!!inputs.confirmation.message ? styles['show-message'] : ''}`}>
              {inputs.confirmation.message}
            </span>
          </div>
        </fieldset>

        <div className={styles['button-container']}>
          <Button
            tabIndex="6"
            type="submit"
            text={isSending ? 'Sending, please wait...' : 'Send'}
          />

          <span className={`${styles.message} ${!!formValidationMessage ?  styles['show-message'] : ''}`}>
            {formValidationMessage}
          </span>
        </div>
      </form>
    </div>
  )
}

export default Form
