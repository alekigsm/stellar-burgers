/// <reference types="cypress" />

/// JSON файл с фикстурой можно загрузить напрямую используя
// встроенный JavaScript сборщик
// 📝 Это показывает альтернативный способ загрузки фикстур через require()
// вместо использования cy.fixture()
const exp = require('constants');
const requiredExample = require('../../fixtures/ingredients');

context('ConstructorBurger', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');

    // загрузить файл фикстуры ingredients.json и сохранить
    // в объекте контекста теста
    // 💡 Фикстура загружается один раз перед каждым тестом и сохраняется как alias 'example'
    // чтобы быть доступной через this.example в тестах
    cy.fixture('ingredients.json').as('example');
  });

  it('cy.fixture() - загрузить фикстуру', () => {
    // https://on.cypress.io/fixture

    // Вместо того чтобы писать ответ в коде, вы можете
    // использовать содержимое файла фикстуры.
    // 🎯 Это демонстрирует преимущество фикстур - переиспользование тестовых данных

    // когда приложение делает Ajax запрос соответствующий "GET **/comments/*"
    // Cypress перехватит его и ответит объектом из фикстуры `ingredients.json`
    // 🔧 Intercept перехватывает сетевые запросы и подменяет ответ на данные из фикстуры
    // https://norma.nomoreparties.space/api/ingredients

    cy.intercept('GET', '**/norma.nomoreparties.space/api/ingredients*', {
      fixture: 'ingredients.json'
    }).as('getIngredientsApi');

    // у нас есть код, который получает комментарий когда
    // кнопка нажата в scripts.js
    // 🖱️ Эмулируется пользовательское действие, которое запускает сетевой запрос
    // cy.get('.fixture-btn').click();

    // ⏳ Ожидание завершения перехваченного запроса и проверка ответа
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
