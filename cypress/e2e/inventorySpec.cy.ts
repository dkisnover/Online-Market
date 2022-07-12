describe('Header Test', () =>{

  beforeEach(() =>{
    cy.visit('http://localhost:4200/inventory-list')
    cy.get('[data-cy="header-title"]').as('header-title');
    cy.get('[data-cy="header-inventory-title"]').as('header-inventory-title');
    cy.get('[data-cy="header-cart-title"]').as('header-cart-title');
    cy.get('[data-cy="header-receipt-title"]').as('header-receipt-title');
  })
  
  it('contains the correct header', () => {
    cy.get('header-title').invoke('text').should('equal', 'Online Market');
  } )

  it('contains the correct inventory header', () => {
    cy.get('header-inventory-title').invoke('text').should('equal', 'Inventory');
  } )

  it('contains the correct cart header', () => {
    cy.get('cart-header-title').invoke('text').should('equal', 'Cart');
  } )

  it('contains the correct receipt header', () => {
    cy.get('header-receipt-title').invoke('text').should('equal', 'Receipt');
  } )

  it('Redirects to inventory-list', () => {
    cy.contains('inventory-header-title').should('be.visible').click()
    cy.url().should('be.equal', 'http://localhost:4200/inventory-list')
  } )
  it('Redirects to shopping-cart', () => {
    cy.contains('cart-header-title').should('be.visible').click()
    cy.url().should('be.equal', 'http://localhost:4200/shopping-cart')
  } )

  it('Redirects to receipt-tracker/display', () => {
    cy.contains('receipt-header-title').should('be.visible').click()
    cy.url().should('be.equal', 'http://localhost:4200/receipt-tracker/display')
  } )



})