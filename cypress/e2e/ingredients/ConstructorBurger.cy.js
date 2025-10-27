/// <reference types="cypress" />
import { testUrl, timeout } from '../../test-constants';
const exp = require('constants');
const requiredExample = require('../../fixtures/ingredients');

context('ConstructorBurger', () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.fixture('ingredients.json').as('example');
    cy.checkAppLoaded(timeout);
  });

  it('cy.fixture() - загрузить фикстуру', () => {
    cy.intercept('GET', '**/norma.education-services.ru/api/ingredients*', {
      fixture: 'ingredients.json'
    }).as('getIngredientsApi');
    cy.wait('@getIngredientsApi')
      .its('response.body')
      .should((body) => {
        expect(body.success).to.be.true;
        expect(body.data?.[0]?.name).to.equal(
          'Наша булка !!!!!!!!!!!!!!!!!!!!!!!!!!!'
        );
      });
  });
  // 1 - найти первую кнопку добавить булки и нажать
  // 2 - переключиться на начинки и добавить 1ю начинку
  // 3 - переключится на соус добавить 1ю соус
  // 4 проверить что в конструторе есть буелка, начинка , соус по имени
  it('добавление ингредиента из списка в конструктор', function () {
    cy.addIngredientsToConstructor();
    cy.verifyConstructorIngredients();
  });
  it('открытие модального окна ингридиента', function () {
    cy.get(`[alt='картинка ингредиента.']`).eq(0).click();
    cy.contains('h3', 'Детали ингредиента').next().click();
    cy.get(`[alt='картинка ингредиента.']`).eq(0).click();
    cy.get('body').click(0, 0);
  });
});
