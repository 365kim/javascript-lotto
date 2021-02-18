import {
  LOTTO_PRICE,
  PURCHASED_QUANTITY_MESSAGE,
  LOTTO_NUMBER_SEPARATOR,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
} from '../../src/js/constants.js';

describe('구매한 로또 UI 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const numOfLotto = 3;

  it('Enter키 이벤트로 로또를 구입한 후 입력된 로또 구입 금액으로 발급한 로또를 화면에 표시한다.', () => {
    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * numOfLotto)
      .type('{enter}');
    cy.get('.purchased-lotto-section').should('be.visible');
    cy.get('.purchased-lotto-label').should('have.text', PURCHASED_QUANTITY_MESSAGE(numOfLotto));
    cy.get('.lotto-ticket-container > li').should('have.length', numOfLotto);
    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
  });

  it('번호보기 토글이 비활성화 되어 있는 상태에서 토글을 누르면, 로또 아이콘이 세로로 배치되고 로또 번호가 표시된다.', () => {
    cy.get('.switch').click();
    cy.get('.lotto-numbers-toggle-button').should('be.checked');
    cy.get('.lotto-ticket-container').should('have.class', 'flex-col');
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('표시된 로또 번호의 개수, 중복여부, 범위를 검사한다.', () => {
    cy.get('.lotto-numbers').each(($el) => {
      const lottoNumbers = $el.text().split(LOTTO_NUMBER_SEPARATOR);

      expect(lottoNumbers.length).to.be.equal(LOTTO_NUMBERS_LENGTH);
      expect(lottoNumbers.length).to.be.equal(new Set(lottoNumbers).size);
      lottoNumbers.forEach((lottoNumber) => {
        expect(Number(lottoNumber)).to.be.within(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      });
    });
  });

  it('로또를 재구입하면 기존에 구매한 로또를 삭제하고 새로 구매한 로또를 보여준다.', () => {
    const nextNumOfLotto = numOfLotto * 2;

    cy.get('.purchase-amount-input')
      .clear()
      .type(LOTTO_PRICE * nextNumOfLotto);
    cy.get('.purchase-amount-button').click();
    cy.get('.lotto-ticket-container > li').should('have.length', nextNumOfLotto);
  });

  it('번호보기 토글이 활성화된 상태에서 재구입을 하면, 토글 상태가 변하지 않고 새로 구매한 로또번호를 보여준다.', () => {
    cy.get('.lotto-numbers-toggle-button').should('be.checked');
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('번호보기 토글이 활성화된 상태에서 토글을 누르면, 로또 아이콘이 가로로 배치되고 로또 번호가 사라진다.', () => {
    cy.get('.switch').click();
    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
    cy.get('.purchased-lotto-section').should('not.have.class', 'flex-col');
    cy.get('.lotto-numbers').should('not.be.visible');
  });
});
