const { AssertionError } = require("assert")

describe('Form', () => {
  beforeEach(() => {
    cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.contains('Nodes').click()
  })

  it('tries to submit with data', () => {
    cy.get('#Name').type('Node 1')
    cy.get('#ShortName').type('TTT')
    cy.get('#Longitude').type(12)
    cy.get('#Latitude').type(32)
    cy.get('#IsDepot').click()
    cy.get('#IsReliefPoint').click()
    cy.contains('Submit').click()
    cy.contains('Node created successfully.')
  })

  it('tries to submit with empty data', () => {
    cy.get('#Name').type('asdasd')
    cy.contains('Submit').click()
    cy.contains('Node validation error.')
  })
})