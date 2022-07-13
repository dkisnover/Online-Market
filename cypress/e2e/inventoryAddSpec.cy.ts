describe('Inventory Add Test', () =>{

    beforeEach(() =>{
      cy.visit('http://localhost:4200/inventory-list/add')
      cy.get('[data-cy="header-title"]').as('header-title');
      cy.get('[data-cy="header-inventory-title"]').as('header-inventory-title');
      cy.get('[data-cy="header-cart-title"]').as('header-cart-title');
      cy.get('[data-cy="header-receipt-title"]').as('header-receipt-title');
  
      cy.get('[data-cy="inventory-table-number"]').as('table-number');
      cy.get('[data-cy="inventory-table-stock"]').as('table-stock');
      cy.get('[data-cy="inventory-table-name"]').as('table-name');
      cy.get('[data-cy="inventory-table-price"]').as('table-price');
      cy.get('[data-cy="inventory-table-imported"]').as('table-imported');
      cy.get('[data-cy="inventory-table-tax"]').as('table-tax');
      cy.get('[data-cy="inventory-table-quantity"]').as('table-quantity');
      cy.get('[data-cy="inventory-table-submit"]').as('table-submit');
      cy.get('[data-cy="inventory-table-head"]').as('table-head');
      cy.get('[data-cy="inventory-add-button"]').as('add-button');
      cy.get('[data-cy="add-name"]').as('add-name');
      cy.get('[data-cy="add-price"]').as('add-price');
      cy.get('[data-cy="add-stock"]').as('add-stock');
      cy.get('[data-cy="add-imported"]').as('add-imported');
      cy.get('[data-cy="add-tax"]').as('add-tax');
      cy.get('[data-cy="add-cancel"]').as('add-cancel');
      cy.get('[data-cy="add-submit"]').as('add-submit');
        
  
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
  
    it('Redirects to inventory add component', () => {
      cy.get('@add-button').should('be.visible').click()
      cy.url().should('be.equal', 'http://localhost:4200/inventory-list/add')
    } )
  
    it('contains the correct table number header', () => {
      cy.get('@table-number').invoke('text').should('equal', '#');
    } )

    it('contains the correct table stock header', () => {
      cy.get('@table-stock').invoke('text').should('equal', 'Stock');
    } )

    it('contains the correct table name header', () => {
      cy.get('@table-name').invoke('text').should('equal', 'Name');
    } )

    it('contains the correct table Price header', () => {
      cy.get('@table-price').invoke('text').should('equal', 'Price');
    } )

    it('contains the correct table Imported header', () => {
      cy.get('@table-imported').invoke('text').should('equal', 'Imported');
    } )

    it('contains the correct table tax exempt header', () => {
      cy.get('@table-tax').invoke('text').should('equal', 'Tax Exempt');
    } )

    it('contains the correct table quantity header', () => {
      cy.get('@table-quantity').invoke('text').should('equal', 'Quantity');
    } )

    it('contains the correct table submit header', () => {
      cy.get('@table-submit').invoke('text').should('equal', 'Submit');
    } )

    it('contains the correct page header', () => {
      cy.get('@table-head').invoke('text').should('equal', 'Inventory');
    } )


    it('contains the name input label', () => {
        cy.get('[data-cy="add-name"]').invoke('text').should('equal', 'Name');
      } )
      it('contains the price input label', () => {
        cy.get('[data-cy="add-price"]').invoke('text').should('equal', 'Price');
      } )
      it('contains the stock input label', () => {
        cy.get('[data-cy="add-stock"]').invoke('text').should('equal', 'Stock');
      } )
      it('contains the import input label', () => {
        cy.get('[data-cy="add-imported"]').invoke('text').should('equal', 'Imported');
      } )
      it('contains the tax exempt input label', () => {
        cy.get('[data-cy="add-tax"]').invoke('text').should('equal', 'Tax Exempt');
      } )

      it('Redirects to inventory list component', () => {
        cy.get('@add-cancel').should('be.visible').click()
        cy.url().should('be.equal', 'http://localhost:4200/inventory-list')
      } )

    

      
  
  })