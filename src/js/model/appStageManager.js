import LottoTicket from './LottoTicket.js';
import { getRateOfReturn } from '../utils/general.js';
import {
  APP_INIT,
  PURCHASE_AMOUNT_SUBMITTED,
  TICKET_ISSUE_REQUESTED,
  TICKET_ISSUE_COMPLETED,
  WINNING_NUMBER_SUBMITTED,
  RESULT_REQUESTED,
  APP_RESET,
} from '../constants/appStages.js';
import { LOTTO_PRICE, WINNING_PRIZE } from '../constants/lottoRules.js';
import { RATE_OF_RETURN_DECIMAL_PLACE } from '../constants/display.js';

export default class AppStageManager {
  constructor() {
    this.stage = APP_INIT;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;

    this.subscribers = {
      [PURCHASE_AMOUNT_SUBMITTED]: [],
      [TICKET_ISSUE_REQUESTED]: [],
      [TICKET_ISSUE_COMPLETED]: [],
      [WINNING_NUMBER_SUBMITTED]: [],
      [RESULT_REQUESTED]: [],
      [APP_RESET]: [],
    };

    this.selfSubscribe();
  }

  subscribe(stage, subscriber) {
    this.subscribers[stage].push(subscriber);
  }

  unsubscribe(stage, subscriber) {
    this.subscribers[stage].splice(this.subscribers.indexOf(subscriber), 1);
  }

  notifySubscribers(stage) {
    this.subscribers[stage]?.forEach((subscriber) => subscriber());
  }

  createTickets() {
    const autoTickets = [...Array(this.numOfLotto - this.lottoTickets.length)].map(() => new LottoTicket());

    this.lottoTickets = this.lottoTickets.concat(autoTickets);
    this.setStates({ stage: TICKET_ISSUE_COMPLETED });
  }

  scoreTickets() {
    if (this.lottoTickets.length > 0 && Object.keys(this.winningNumber).length > 0) {
      this.lottoTickets.forEach((lottoTicket) => lottoTicket.setTotalMatchCount(this.winningNumber));
    }
  }

  calculateRateOfReturn() {
    const profit = this.lottoTickets.reduce((acc, lottoTicket) => acc + WINNING_PRIZE[lottoTicket.numOfMatch].PRIZE, 0);
    const loss = this.lottoTickets.length * LOTTO_PRICE;
    const rateOfReturn = getRateOfReturn(profit, loss);

    this.rateOfReturn =
      rateOfReturn % 1 !== 0 ? Number(rateOfReturn.toFixed(RATE_OF_RETURN_DECIMAL_PLACE)) : rateOfReturn;
  }

  selfSubscribe() {
    this.subscribe(TICKET_ISSUE_REQUESTED, this.createTickets.bind(this));
    this.subscribe(WINNING_NUMBER_SUBMITTED, this.scoreTickets.bind(this));
    this.subscribe(WINNING_NUMBER_SUBMITTED, this.calculateRateOfReturn.bind(this));
    this.subscribe(APP_RESET, this.resetStates.bind(this));
  }

  setStates({ stage, numOfLotto, lottoTickets, winningNumber }) {
    this.stage = stage ?? this.stage;
    this.numOfLotto = numOfLotto ?? this.numOfLotto;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;

    this.notifySubscribers(stage);
  }

  resetStates() {
    this.stage = APP_INIT;
    this.lottoTickets = [];
    this.winningNumber = {};
    this.rateOfReturn = 0;
  }
}
