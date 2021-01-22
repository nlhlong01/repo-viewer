describe('Facebook Repo Viewer E2E Tests', function() {
  it('should render without error', function() {
    cy.visit('localhost:3000');
    cy.get('.list-group-item').should('have.length', 10);
  });

  describe('Interacting with the UI', function() {
    describe('Searching', function() {  
      it('should find a repo by typing in the search box', function() {
        cy.get('#search-box').type('jest');
        cy.get('.list-group-item').should('have.length', 1);
        cy.get('.list-group-item:nth-child(1) .repo-name')
          .should('have.text', 'jest');
        cy.get('#search-box').type('{selectAll}{del}');
      });
  
      describe('Filtering search results', () => {
        it('should filter by type', function() {
          cy.get('#filter-type .dropdown-item').should('have.length', 5);
          cy.get('#filter-type').click();
          cy.get('#filter-type-mirrors').click();
          cy.get('#filter-type').click();
          cy.get('#filter-type-all').click();
        });
  
        it('should filter by language', function() {
          cy.get('#filter-language .dropdown-item').should('have.length.gt', 5);
          cy.get('#filter-language').click();
          cy.get('#filter-language-typescript').click();
          cy.get('#filter-language').click();
          cy.get('#filter-language-all').click();
        });
      });
    });

    describe('(Un)starring a repo', () => {
      it('should (un)star a repo', function() {
        cy.get('.list-group-item:nth-child(1) .star-button').click();
        cy.get('.list-group-item:nth-child(1) .star-button').click();
      });
    });
  });
});
