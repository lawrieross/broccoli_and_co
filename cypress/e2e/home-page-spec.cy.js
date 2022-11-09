describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('successfully navigates to home page', () => {
    cy.get('.logo').click()
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('')
      expect(loc.host).to.eq('localhost:3000')
    })
  })

  it('successfully opens popup', () => {
    cy.get('.Button_button__LjnpS').click()
    cy.get('body').should('have.css', 'overflow', 'hidden')
    cy.get('.Form_form__0sFOU').should('be.visible')
    cy.get(':nth-child(1) > input').should('be.focused')
  })

  it('successfully closes popup', () => {
    cy.get('.Popup_popup__rP7zX').click({ position: 'topLeft' })
    cy.get('body').should('have.css', 'overflow', 'auto')
  })

  it('successfully shows validation on form', () => {
    cy.get('.Button_button__LjnpS').click()
    cy.get('.Form_button-container__edSlg > .Button_button__LjnpS').click()
    cy.get(':nth-child(1) > .Form_message__eSIVc').contains('Full name needs to be at least 3 characters long')
    cy.get(':nth-child(2) > .Form_message__eSIVc').contains('Ensure email is in the correct format')
    cy.get(':nth-child(3) > .Form_message__eSIVc').contains('Ensure email fields match and are in the correct format')
    cy.get('.Form_button-container__edSlg > .Form_message__eSIVc').contains('Ensure all fields are valid')
    cy.wait(350)
    cy.get('.Form_button-container__edSlg > .Form_message__eSIVc').should('have.text', '')
  })

  it('successfully shows an invalid response message', () => {
    cy.get(':nth-child(1) > input').type('Joe Smith')
    cy.get(':nth-child(2) > input').type('usedemail@blinq.app')
    cy.get(':nth-child(3) > input').type('usedemail@blinq.app')
    cy.get('.Form_button-container__edSlg > .Button_button__LjnpS').click()
    cy.get('.Form_button-container__edSlg > .Form_message__eSIVc').contains('This email address is already in use')
  })

  it('successfully sends invite request', () => {
    cy.get('.Response_response__43q3G').not('be.visible')
    cy.get(':nth-child(2) > input').clear()
    cy.get(':nth-child(3) > input').clear()
    cy.get(':nth-child(2) > input').type('hello@example.com')
    cy.get(':nth-child(3) > input').type('hello@example.com')
    cy.get('.Form_button-container__edSlg > .Button_button__LjnpS').click()
    cy.get('.Response_response__43q3G').should('be.visible')
  })

  it('successfully returns to main screen', () => {
    cy.get('.Response_response__43q3G > .Button_button__LjnpS').click()
    cy.get('body').should('have.css', 'overflow', 'auto')
  })
})
