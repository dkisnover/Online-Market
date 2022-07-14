describe('Inventory List Test', () =>{
    beforeEach(() =>{
        cy.visit('http://localhost:4200/receipt-tracker/display');
        cy.get('[data-cy="header-title"]').as('header-title');
        cy.get('[data-cy="header-inventory-title"]').as('header-inventory-title');
        cy.get('[data-cy="header-cart-title"]').as('header-cart-title');
        cy.get('[data-cy="header-receipt-title"]').as('header-receipt-title');

        cy.get('[data-cy="receipt-display-number"]').as('receipt-display-number');
        cy.get('[data-cy="receipt-display-date"]').as('receipt-display-date');
        cy.get('[data-cy="receipt-display-price"]').as('receipt-display-price');
        cy.get('[data-cy="receipt-display-view"]').as('receipt-display-view');

    })


    it('contains the correct header', () => {
        cy.get('[data-cy="header-title"]').invoke('text').should('equal', 'Online Market');
    } )
    
    it('contains the correct inventory header', () => {
        cy.get('@header-inventory-title').invoke('text').should('equal', 'Inventory');
    } )
    
    it('contains the correct cart header', () => {
        cy.get('@header-cart-title').invoke('text').should('equal', 'Cart');
    })
    
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

    it('contains correct receipt number header', () => {
        cy.get('@receipt-display-number').invoke('text').should('equal', '#');
    })

    it('contains correct receipt date header', () => {
        cy.get('@receipt-display-date').invoke('text').should('equal', 'Date');
    })

    it('contains correct receipt price header', () => {
        cy.get('@receipt-display-price').invoke('text').should('equal', 'Total Price');
    })

    it('contains correct receipt view header', () => {
        cy.get('@receipt-display-view').invoke('text').should('equal', 'View Receipt');
    })

})