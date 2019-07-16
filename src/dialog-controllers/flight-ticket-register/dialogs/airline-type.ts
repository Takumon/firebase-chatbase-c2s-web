import { Question, Bot} from '../types';
import {
  createConfirmAirLineMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class AirLineType implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    this.registerFunc(createConfirmAirLineMessage());
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const answer = message.customMessage.text;
    this.bot.saveData(DATA_TYPE.CONDITON_AIRELINE_TYPE, answer);
    return { success: true };
  }

  private validate(message: any ) {
    const answer = message.customMessage.text;
    return answer === '国際線' ? { isValid: true }
      : answer === '国内線' ? { isValid: true }
      : { isValid: false, error: '「国際線」か「国内線」を指定してください。' };
  }
}
