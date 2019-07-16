import { Question, Bot} from '../types';
import {
  createFlightTicketPurchaseMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class Purchase implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    const order = await fetchOrder();
    const oderForData = Object.assign({}, order, { confirmed: false });
    await this.registerFunc(createFlightTicketPurchaseMessage(oderForData));
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const purchase = message.customMessage.contents;
    this.bot.saveData(DATA_TYPE.PURCHASE, purchase);
    return { success: true };
  }

  private validate(message: any ) {
    // Nothing because entire prossecc is execued in client side.
    return { isValid: true };
  }
}

async function fetchOrder(): Promise<any> {
  // TODO fetch Order in API
  return {
    price: '￥98,000',
    tax: '￥0',
    amount: '￥98,000',
    date: '12/30(月)',
  };
}
