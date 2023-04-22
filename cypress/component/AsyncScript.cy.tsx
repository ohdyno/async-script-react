import AsyncScript from "@/components/AsyncScript";

describe('AsyncScript', () => {
    const src = "/js/hello-world.js";

    function mount(component: JSX.Element,
                   configureLoadingScript = () => {
                       cy.intercept(src, '').as('LoadingScript')
                   }
    ) {
        configureLoadingScript()
        cy.mount(component)
        cy.wait('@LoadingScript')
    }

    it('loads script at the specified src', () => {
        mount(<AsyncScript src={src}/>)
        cy.get(`[src="${src}"]`).should('have.length', 1)
    });

    it('calls the onLoad prop once the script loads', () => {
        mount(<AsyncScript src={src} onLoad={cy.spy().as('OnLoadSpy')}/>)
        cy.get('@OnLoadSpy').should('have.been.called')
    });

    it('calls the onError prop if the script fails to load', () => {
        mount(
            <AsyncScript
                src={src}
                onLoad={cy.spy().as('OnLoadSpy')}
                onError={cy.spy().as('OnErrorSpy')}
            />,
            () => {
                cy.intercept(src, {statusCode: 404}).as('LoadingScript')
            }
        )
        cy.get('@OnErrorSpy').should('have.been.called')
        cy.get('@OnLoadSpy').should('not.have.been.called')
    });

    describe('Appending script tag to HTML proper element', () => {
        it('appends to appendTo prop value', () => {
            function createElementToAppendTo() {
                return cy.document().then((doc) => {
                    const element = doc.createElement('div');
                    element.setAttribute('data-test-id', 'app-mount-point')
                    doc.body.append(element)
                    return cy.wrap(element)
                })
            }

            createElementToAppendTo().as('MountPoint')
            cy.get('@MountPoint').then(($element) => {
                mount(<AsyncScript src={src} appendTo={$element.get(0)}/>)
            })
            cy.get('@MountPoint').children().should('have.length.at.least', 1)
        });

        it('appends to document.head if appendTo prop is not set', () => {
            mount(<AsyncScript src={src}/>)
            cy.get('head').find(`script[src="${src}"]`).should('exist')
        });
    });
})
