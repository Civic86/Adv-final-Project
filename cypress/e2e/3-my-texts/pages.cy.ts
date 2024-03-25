describe('Navigation', () => {

    beforeEach(() => {
        cy.viewport(1280, 720) // Set viewport to 1280px x 720px
      })

    it('should navigate to pokedex page and check text', () => {
      // Start from index page
      cy.visit('http://localhost:3000');
  
      // Find link with href 
      cy.get('a[href*="pokedex"]').click();
  
     
    });

    it('should have alt', () => {
        cy.visit('http://localhost:3000/pokemon?name=togepi');
        cy.get('[alt="Official Artwork"]').should('be.visible')
    })

    it('color check', () => {
        cy.visit('http://localhost:3000/pokedex');
    
        cy.get('p').invoke('css', 'color').should('include', 'rgb(90, 201, 161)');
    });

    it('check length of button', ()=> {
        cy.visit('http://localhost:3000/pokedex');

        cy.get('button').should('have.length', '1');
    })


    it('should search for Pokemon by name', () => {
        
        cy.visit('http://localhost:3000/pokedex')
    
        // Check Pokedex header is visible and has the correct text and styling
        cy.get('p').should('have.css', 'font-size', '30px')
          .and('have.css', 'font-weight', '600')
          .and('have.css', 'color', 'rgb(90, 201, 161)')
          .and('have.text', 'Pokedex')
    
        // input field is visible and functional
        cy.get('input[type="string"]').should('be.visible')
          .and('have.attr', 'placeholder', 'Search by Pokemon name, id')
    
       
        const searchTerm = 'Charmeleon' 
        cy.get('input[type="string"]').type(searchTerm)
    
           cy.wait(500)    
      })

      it('should display Pokemon cards in a grid layout', () => {
               cy.visit('http://localhost:3000/pokedex')
            cy.get('div').should('exist')
      })




      it('should have button, image, h1, p, div', () => {
        cy.visit('http://localhost:3000/pokemon?name=togepi');
       
        cy.get('Button').should('exist')
    cy.get('img').should('exist')
    cy.get('h1').should('exist')
    cy.get('p').should('exist')
    cy.get('div').should('exist')
    cy.get('div').should('exist')
    cy.get('Button').should('exist')
    })

    it('type', () => {
        cy.visit('http://localhost:3000/pokedex');

    const searchQuery = 'Gardevoir-Mega'; 
    cy.get('input[type="string"]').type(searchQuery)
    cy.get('input[type="string"]').should('have.value', searchQuery)

    })

    it('find()', () => {
        cy.visit('http://localhost:3000/pokedex');
    cy.get('div').eq(1).find('p').should('have.length', 1)
    })



    
  });
  