/// <reference types="cypress" />

Cypress.Commands.add('checkAppLoaded', (timeout = 10000) => {
  cy.get('body').should('be.visible');
  cy.log('ожидаем около:', timeout, 'секунд');
  cy.get('[data-testid="main"]', { timeout }).should('be.visible');
});
// commands.js

// Команда для добавления ингредиентов в конструктор
Cypress.Commands.add('addIngredientsToConstructor', () => {
  cy.log('Добавляем ингредиенты в конструктор');

  cy.get('.common_button').eq(0).click();
  cy.get('[data-cy="Tabs"]').children().eq(1).click();
  cy.get('.common_button').eq(3).click();
  cy.get('[data-cy="Tabs"]').children().eq(2).click();
  cy.get('.common_button').last().click();
});

// Команда для проверки ингредиентов в конструкторе
Cypress.Commands.add('verifyConstructorIngredients', () => {
  cy.log('Проверяем ингредиенты в конструкторе');

  cy.get('.constructor-element').contains('Краторная булка N-200i');
  cy.get('.constructor-element').contains(
    'Филе Люминесцентного тетраодонтимформа'
  );
  cy.get('.constructor-element').contains(
    'Соус с шипами Антарианского плоскоходца'
  );
});
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('bodyLoading', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
