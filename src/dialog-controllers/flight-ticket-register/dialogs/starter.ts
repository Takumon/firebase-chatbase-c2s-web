
import { Question, Bot} from '../types';
import {
  createConfirmMessage,
} from '../../utils/message-converter';
import { ValidationResult, PostProcessResult } from '../types';

export default class Starter implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    await this.registerFunc(createConfirmMessage(
      '予約を開始しますか？',
      'チャットから航空機件予約が行えます。航空機件予約を開始しますか？'
    ));
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    // nothing
    console.log(message);
    return { success: true };
  }

  private validate(message: any ) {
    const answer = message.customMessage.text;
    return answer === 'はい' ? { isValid: true }
      : answer === 'いいえ' ? { isValid: true }
      : { isValid: false, error: '「はい」か「いいえ」を指定してください。' };
  }
}
