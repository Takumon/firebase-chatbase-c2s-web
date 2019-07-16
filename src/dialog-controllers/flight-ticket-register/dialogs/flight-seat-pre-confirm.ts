import { Question, Bot} from '../types';
import {
  createFlightSeatPreConfirmMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
} from '../types';

export default class FlightSeatPreConfirm implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    await this.registerFunc(createFlightSeatPreConfirmMessage());
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    return { success: true };
  }

  private validate(message: any ) {
    const answer = message.customMessage.text;
    return answer === 'はい' ? { isValid: true }
      : answer === 'いいえ' ? { isValid: true }
      : { isValid: false, error: '「はい」か「いいえ」を指定してください。' };
  }
}
