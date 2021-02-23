import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoTicketDisplay from './LottoTicketDisplay.js';
import WinningNumberInput from './WinningNumbersInput.js';
import WinningResultDisplay from './WinningResultDisplay.js';
import AppStageManager from '../model/appStageManager.js';

export default class App {
  constructor() {
    this.stageManager = new AppStageManager();
  }

  init() {
    this.lottoPurchaseInput = new LottoPurchaseInput({
      stageManager: this.stageManager,
    });
    this.lottoTicketDisplay = new LottoTicketDisplay({
      stageManager: this.stageManager,
    });
    this.winningNumberInput = new WinningNumberInput({
      stageManager: this.stageManager,
    });
    this.winningResultDisplay = new WinningResultDisplay({
      stageManager: this.stageManager,
    });
  }
}
