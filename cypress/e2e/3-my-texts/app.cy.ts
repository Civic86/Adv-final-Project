describe('index page', ()=>{
   

    it('text area', ()=> {
        cy.visit('http://localhost:3000');
        cy.get('p').should('include.text', 'Vancouver, BC')
    })
   
  

})
