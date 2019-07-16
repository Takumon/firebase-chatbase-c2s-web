import { Question, Bot} from '../types';
import {
  createFlightTicketPurchasePdfMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class PurchaseaPdf implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    const order = this.bot.getData(DATA_TYPE.PURCHASE);
    await this.registerFunc(createFlightTicketPurchasePdfMessage(order));
    return false; // Finish bot
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    // DO Nothing
    return { isValid: true };
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    // DO Nothing
    return { success: true };
  }
}
