import { Question, Bot} from '../types';
import {
  createFlightSeatConfirmMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class FlightSeatConfirm implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    const seat = this.bot.getData(DATA_TYPE.SELECTED_SEAT);
    this.registerFunc(createFlightSeatConfirmMessage(seat));
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const seat = this.bot.getData(DATA_TYPE.SELECTED_SEAT);
    console.log(seat);
    // TODO register seat in API
    return { success: true };
  }

  private validate(message: any ) {
    const answer = message.customMessage.text;
    return answer === 'はい' ? { isValid: true }
      : answer === 'いいえ' ? { isValid: true }
      : { isValid: false, error: '「はい」か「いいえ」を指定してください。' };
  }
}
