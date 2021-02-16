export const LOTTO_PRICE = 1000;
export const MONETARY_UNIT = 1; // 한국의 최소 화폐단위: 1원
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_NUMBERS_LENGTH = 6;
export const LOTTO_NUMBER_SEPARATOR = ', ';
export const PURCHASED_QUANTITY_MESSAGE = (numOfLotto) =>
  `총 ${numOfLotto}개를 구매하였습니다.`;

export const ERROR_MESSAGE = {
  PURCHASE_AMOUNT_IS_INVALID_MONEY: `화폐단위 미만의 자릿수가 포함된 금액입니다. ${LOTTO_PRICE}원 단위로 입력해주세요`,
  PURCHASE_AMOUNT_IS_TOO_LOW: `입력된 금액이 로또 한 장의 가격보다 작습니다. ${LOTTO_PRICE}원 이상의 금액을 입력해주세요`,
  PURCHASE_AMOUNT_HAS_CHANGE: (change) =>
    `입력된 금액에서 ${change}원을 제외한 금액으로 로또를 구매했습니다. 거스름돈 챙겨가세요.`,
};
