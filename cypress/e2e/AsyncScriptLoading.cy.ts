describe('App component that loads an async script', () => {
    it('will load the script successfully', () => {
        cy.intercept("/js/hello-world.js", {fixture: 'test.js'}).as('LoadingScript')
        cy.visit("http://localhost:3000")
        cy.wait('@LoadingScript')
        cy.get('[data-cy="load-script"]').should('have.length', 1)
    });
})
