import App, {createAction} from '@/components/App';
import {defaultInitialState} from "../../src/components/App";
import {Reducer} from "react";

describe('Simplify UI into two responsibilities using reducers', () => {
    it('renders data from props', () => {
        const initialState = defaultInitialState;

        cy.mount(<App initialState={initialState}/>);

        cy.findByDisplayValue(new RegExp(`${initialState.text}`, 'i')).should('exist')
    });

    it('dispatches the correct action when button is clicked', () => {
        const reducer: Reducer<any, any> = (state, action) => ({text: action.payload})
        const spy = cy.spy(reducer).as("ReducerSpy")
        cy.mount(<App reducer={spy} initialState={defaultInitialState}/>);

        cy.findByLabelText(/input/i).type('some new data')

        cy.get('@ReducerSpy').should('have.been.calledWith', Cypress.sinon.match.any, createAction('some new data'))
    });

    it('renders with default props', () => {
        cy.mount(<App/>);

        cy.findByLabelText(/input/i).should('exist')
    });
})
