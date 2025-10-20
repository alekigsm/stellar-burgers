/// <reference types="cypress" />

/// JSON файл с фикстурой можно загрузить напрямую используя
// встроенный JavaScript сборщик
// 📝 Это показывает альтернативный способ загрузки фикстур через require()
// вместо использования cy.fixture()
const exp = require('constants');
/* const requiredExample = require('../../fixtures/ingredients');
const requiredExample = require('../../fixtures/feeds'); */
const requiredExample = require('../../fixtures/user');
context('ConstructorBurger', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');

    // загрузить файл фикстуры ingredients.json и сохранить
    // в объекте контекста теста
    // 💡 Фикстура загружается один раз перед каждым тестом и сохраняется как alias 'example'
    // чтобы быть доступной через this.example в тестах
    cy.fixture('user.json').as('example');
  });

  //   Создание заказа:
  // Созданы моковые данные ответа на запрос данных пользователя.
  // Созданы моковые данные ответа на запрос создания заказа.
  // Подставляются моковые токены авторизации.
  // Собирается бургер.
  // Вызывается клик по кнопке «Оформить заказ».
  // Проверяется, что модальное окно открылось и номер заказа верный.
  // Закрывается модальное окно и проверяется успешность закрытия.
  // Проверяется, что конструктор пуст.
  //{"success":true,"user":{"email":"igr0k@ya.ru","name":"sasha"}}
  it('собрали бургер ', function () {
    cy.intercept('GET', '**/norma.nomoreparties.space/api/auth/user*', {
      fixture: 'user.json'
    }).as('getUserApi');
    cy.wait('@getUserApi')
      .its('response.body')
      .should((body) => {
        expect(body.success).to.be.true;
        expect(body.user.email).to.equal('пусто@ya.ru');
        expect(body.user.name).to.equal('sasha');
        expect(body.accessToken).to.equal('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGVkMTdhNjczMDg2MDAxYmE4Yjg2ZCIsImlhdCI6MTc2MDk2NTAwNSwiZXhwIjoxNzYwOTY2MjA1fQ.Eluw0QFiy3SfCRu5BVVjYbuunvLhZV0dNZOe0odUfOM');
        expect(body.refreshToken).to.equal('bd2779151682a163a7d080e9798e4cd51e255a1d7e7eff755bc4ef8a96cdca0906300895cceb8d86');
      });

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
    

  // Выполняем клик
  cy.contains('button', 'Оформить заказ').click();
 cy.intercept('POST', '**norma.nomoreparties.space/api/orders**').as('orderBurgerApi');
  // Проверяем последствия клика
  cy.wait('@orderBurgerApi'); // ждем запрос
  cy.get('.order-modal').should('be.visible'); // проверяем UI изменение

  });
});
