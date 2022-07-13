describe('Inventory Add Test', () =>{

    beforeEach(() =>{
      cy.visit('http://localhost:4200/shopping-cart')
      cy.get('[data-cy="header-title"]').as('header-title');
      cy.get('[data-cy="header-inventory-title"]').as('header-inventory-title');
      cy.get('[data-cy="header-cart-title"]').as('header-cart-title');
      cy.get('[data-cy="header-receipt-title"]').as('header-receipt-title');

      cy.get('[data-cy="cart-head-number"]').as('cart-head-number');
      cy.get('[data-cy="cart-head-name"]').as('cart-head-name');
      cy.get('[data-cy="cart-head-price"]').as('cart-head-price');
      cy.get('[data-cy="cart-head-tax"]').as('cart-head-tax');
      cy.get('[data-cy="cart-head-quantity"]').as('cart-head-quantity');
      cy.get('[data-cy="cart-head-total-price"]').as('cart-head-total-price');
      cy.get('[data-cy="cart-head-remove"]').as('cart-head-remove');
    })

    it('contains the correct header', () => {
        cy.get('[data-cy="header-title"]').invoke('text').should('equal', 'Online Market');
      } )
    
      it('contains the correct inventory header', () => {
        cy.get('@header-inventory-title').invoke('text').should('equal', 'Inventory');
      } )
    
      it('contains the correct cart header', () => {
        cy.get('@header-cart-title').invoke('text').should('equal', 'Cart');
      } )
    
      it('contains the correct receipt header', () => {
        cy.get('@header-receipt-title').invoke('text').should('equal', 'Receipt');
      } )
    
      it('Redirects to inventory-list', () => {
        cy.contains('Inventory').should('be.visible').click()
        cy.url().should('be.equal', 'http://localhost:4200/inventory-list')
      } )
    
      it('Redirects to shopping-cart', () => {
        cy.contains('Cart').should('be.visible').click()
        cy.url().should('be.equal', 'http://localhost:4200/shopping-cart')
      } )
    
      it('Redirects to receipt-tracker/display', () => {
        cy.contains('Receipt').should('be.visible').click()
        cy.url().should('be.equal', 'http://localhost:4200/receipt-tracker/display')
      } )

    
    it('contains the correct table number header', () => {
      cy.get('@cart-head-number').invoke('text').should('equal', '#');
    } )

    it('contains the correct table name header', () => {
        cy.get('@cart-head-name').invoke('text').should('equal', 'Name');
    } )

    it('contains the correct table price header', () => {
        cy.get('@cart-head-price').invoke('text').should('equal', 'Price');
    } )

    it('contains the correct table tax header', () => {
        cy.get('@cart-head-tax').invoke('text').should('equal', 'Tax');
    } )

    it('contains the correct table quantity header', () => {
        cy.get('@cart-head-quantity').invoke('text').should('equal', 'Quantity');
    } )

    it('contains the correct table total price header', () => {
        cy.get('@cart-head-total-price').invoke('text').should('equal', 'Total Price');
    } )

    it('contains the correct table remove header', () => {
        cy.get('@cart-head-remove').invoke('text').should('equal', 'Remove');
    } )
  
  })