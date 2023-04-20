import Child from "@/components/Child";

describe('Child component could be rendered simply as well', () => {
    it('renders the data', () => {
        const state = {
            text: "some data",
        };

        cy.mount(<Child state={state} dispatch={() => {}}/>);

        cy.findByText(new RegExp(`${state.text}`, 'i')).should('exist')
    });

    it('dispatches the action when user clicks button', () => {
        const state = {text: "some data"};
        const dispatch = cy.spy().as('DispatchSpy');
        cy.mount(<Child state={state} dispatch={dispatch}/>);

        cy.findByText(/button/i).click()

        cy.get('@DispatchSpy').should('have.been.calledWith', {type: 'button pressed'})
    });
})
