import AsyncScript from "@/components/AsyncScript";

describe('AsyncScript', () => {
    const src = "/js/hello-world.js";
    beforeEach(() => {
        cy.intercept(src, '').as('LoadingScript')
    })

    it('loads script at the specified src', () => {
        cy.mount(<AsyncScript src={src}/>)
        cy.wait('@LoadingScript')
        cy.get(`[src="${src}"]`).should('have.length', 1)
    });

    it('calls the onLoad prop once the script loads', () => {
        cy.mount(<AsyncScript src={src} onLoad={cy.spy().as('OnLoadSpy')}/>)
        cy.wait('@LoadingScript')
        cy.get('@OnLoadSpy').should('have.been.called')
    });

    it('calls the onError prop if the script fails to load', () => {
        cy.intercept(src, {statusCode: 404}).as('LoadingScript')
        cy.mount(<AsyncScript src={src} onLoad={cy.spy().as('OnLoadSpy')} onError={cy.spy().as('OnErrorSpy')}/>)
        cy.wait('@LoadingScript')
        cy.get('@OnErrorSpy').should('have.been.called')
        cy.get('@OnLoadSpy').should('not.have.been.called')
    });

    it('appends the script to the node specified by the appendTo prop', () => {
        cy.document().then((doc) => {
            const element = doc.createElement('div');
            element.setAttribute('data-test-id', 'app-mount-point')
            doc.body.append(element)
            return cy.wrap(element)
        }).as('MountPoint')
        cy.get('@MountPoint').then(($element) => {
            cy.mount(<AsyncScript src={src} appendTo={$element.get()[0]}/>)
        })
        cy.wait('@LoadingScript')
        cy.get('@MountPoint').children().should('have.length.at.least', 1)
    });

    it('appends the script document.head if appendTo prop is not set', () => {
        cy.mount(<AsyncScript src={src}/>)
        cy.wait('@LoadingScript')
        cy.get('head').find(`script[src="${src}"]`).should('exist')
    });
})
