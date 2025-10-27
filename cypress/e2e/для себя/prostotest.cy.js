/// <reference types="cypress" />
import { testUrl } from '../../test-constants';
context('ConstructorBurger', () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.fixture('ingredients.json').as('example');
  });

  it('вход в лк', () => {
    cy.contains('Личный кабинет').click();
    it('клик на поле почты', () => {
      cy.contains('E-mail').click();
    });
  });
});
