/// <reference types="cypress" />

const exp = require('constants');
const requiredExample = require('../../fixtures/ingredients');

context('ConstructorBurger', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.fixture('ingredients.json').as('example');
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
    cy.get(`.common_button`).eq(0).click();
    cy.get(`[data-cy='Tabs']`).children().eq(1).click();
    cy.get(`.common_button`).eq(3).click();
    cy.get(`[data-cy='Tabs']`).children().eq(2).click();
    cy.get(`.common_button`).last().click();
    cy.get(`.constructor-element`).contains('Краторная булка N-200i');
    cy.get(`.constructor-element`).contains(
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.get(`.constructor-element`).contains(
      'Соус с шипами Антарианского плоскоходца'
    );
  });
  it('открытие модального окна ингридиента', function () {
    cy.get(`[alt='картинка ингредиента.']`).eq(0).click();
    cy.contains('h3', 'Детали ингредиента').next().click();
    cy.get(`[alt='картинка ингредиента.']`).eq(0).click();
    cy.get('body').click(0, 0);
  });
});
