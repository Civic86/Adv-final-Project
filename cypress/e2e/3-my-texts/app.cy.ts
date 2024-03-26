describe('index page', ()=>{
   

    it('text area', ()=> {
        cy.visit('http://localhost:3000');
        cy.get('p').should('include.text', 'Vancouver, BC')
    })
   
   
    it('style', ()=> {
        cy.visit('http://localhost:3000');
        
        it('should display weather information correctly', () => {
            cy.get('Box').should('have.css', 'background-image', `url("/images/sunny.jpg")`)
            .and('have.css', 'background-size', 'cover')
            .and('have.css', 'background-position', 'center')
            .and('have.css', 'background-repeat', 'no-repeat')
        })
    })


    it('text contains', ()=> {
        cy.visit('http://localhost:3000');

        cy.get('div').children().should('have.length', 27)
    cy.get('div').contains('Wind').should('exist')
    cy.get('div').contains('Humidity').should('exist')
    cy.get('div').contains('Visibility').should('exist')
    cy.get('div').contains('Precipitation').should('exist')
    })

})
