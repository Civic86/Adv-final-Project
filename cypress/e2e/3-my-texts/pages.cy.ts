describe('Navigation', () => {
    it('should navigate to pokedex page and check text', () => {
      // Start from index page
      cy.visit('http://localhost:3000');
  
      // Find link with href 
      cy.get('a[href*="pokedex"]').click();
  
     
    });

    it('should have', () => {
        cy.visit('http://localhost:3000/pokemon?name=togepi');
        cy.get('[alt="Official Artwork"]').should('be.visible')
    })

    it('color check', () => {
        cy.visit('http://localhost:3000/pokedex');
    
        cy.get('p').invoke('css', 'color').should('include', 'rgb(90, 201, 161)');
    });
    

  });
  