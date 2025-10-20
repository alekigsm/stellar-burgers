/// <reference types="cypress" />

// Создание заказа:
// Созданы моковые данные ответа на запрос данных пользователя.
// Созданы моковые данные ответа на запрос создания заказа.
// Подставляются моковые токены авторизации.
// Собирается бургер.
// Вызывается клик по кнопке «Оформить заказ».
// Проверяется, что модальное окно открылось и номер заказа верный.
// Закрывается модальное окно и проверяется успешность закрытия.
// Проверяется, что конструктор пуст.

const exp = require('constants');
const requiredExample = require('../../fixtures/feeds');
//const requiredExample = require('../../fixtures/user');
context('Feeds', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');

    // загрузить файл фикстуры feeds.json и сохранить
    // в объекте контекста теста
    // 💡 Фикстура загружается один раз перед каждым тестом и сохраняется как alias 'example'
    // чтобы быть доступной через this.example в тестах
    cy.fixture('feeds.json').as('example');
  });

  it('cy.fixture() - загрузить фикстуру', () => {
    // https://on.cypress.io/fixture

    // Вместо того чтобы писать ответ в коде, вы можете
    // использовать содержимое файла фикстуры.
    // 🎯 Это демонстрирует преимущество фикстур - переиспользование тестовых данных

    // когда приложение делает Ajax запрос соответствующий "GET **/comments/*"
    // Cypress перехватит его и ответит объектом из фикстуры `feeds.json`
    // 🔧 Intercept перехватывает сетевые запросы и подменяет ответ на данные из фикстуры
    // https://norma.nomoreparties.space/api/feeds
    cy.get(`a[href="/feed"]`).click();
    cy.intercept('GET', '**/norma.nomoreparties.space/api/orders/all*', {
      fixture: 'feeds.json'
    }).as('getFeedsApi');

    // у нас есть код, который получает комментарий когда
    // кнопка нажата в scripts.js
    // 🖱️ Эмулируется пользовательское действие, которое запускает сетевой запрос
    // cy.get('.fixture-btn').click();

    // ⏳ Ожидание завершения перехваченного запроса и проверка ответа
    cy.wait('@getFeedsApi')
      .its('response.body')
      .should((body) => {
        expect(body.success).to.be.true;
      });
  });
  // 1 - найти первую кнопку добавить булки и нажать
  // 2 - переключиться на начинки и добавить 1ю начинку
  // 3 - переключится на соус добавить 1ю соус
  // 4 проверить что в конструторе есть буелка, начинка , соус по имени
  /*   it('добавление ингредиента из списка в конструктор', function () {
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
  }); */
});
