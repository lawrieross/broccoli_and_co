import { useState, useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Popup from '../components/Popup'
import Button from '../components/Button'

function HomePage() {
  const [isPopupOpen, togglePopup] = useState(false)

  useEffect(() => {
    // Stop body from scrolling when popup is open
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isPopupOpen])

  const Overlay = () => isPopupOpen && <Popup togglePopup={togglePopup} />

  return (
    <>
      <Header />

      <main>
        <div className="title-container">
          <h1>A better way to enjoy everyday.</h1>
          <h3>Be the first to know when we launch.</h3>
        </div>

        <Button
          tabIndex="2"
          text="Request an invite"
          onPress={() => togglePopup(true)}
        />
      </main>

      <Footer />
      <Overlay />
    </>
  )
}

export default HomePage
