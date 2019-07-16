import { Question, Bot} from '../types';
import {
  createConfirmationMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class Search implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    await this.registerFunc(createConfirmationMessage([
      { name: '国内線・国際線',  value: this.bot.getData(DATA_TYPE.CONDITON_AIRELINE_TYPE) },
      { name: 'ご予約人数',     value: this.bot.getData(DATA_TYPE.CONDITON_NUMBER_OF_PASSENGERS) },
      { name: '出発地域',       value: this.bot.getData(DATA_TYPE.CONDITON_DEPARTURE) },
      { name: '到着地域',       value: this.bot.getData(DATA_TYPE.CONDITON_ARRIVAL) },
      { name: 'ご出発の日付',    value: this.bot.getData(DATA_TYPE.CONDITON_DEPARTURE_DATE) },
      { name: 'お帰りの日付',    value: this.bot.getData(DATA_TYPE.CONDITON_ARRIVAL_DATE) }
    ]));

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
    return answer === 'はい' ? { isValid: true }
      : answer === 'いいえ' ? { isValid: true } // TODO Reaction for No.
      : { isValid: false, error: '「はい」か「いいえ」を指定してください。' };
  }
}
