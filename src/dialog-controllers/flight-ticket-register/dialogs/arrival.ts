import { Question, Bot} from '../types';
import {
  createArrivalToMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

const PLACES: string[] = ['日本', 'サンノゼ', 'サンフランシスコ' ];

export default class Arrival implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    await this.registerFunc(createArrivalToMessage());
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const answer = message.customMessage.text;
    this.bot.saveData(DATA_TYPE.CONDITON_ARRIVAL, answer);
    return { success: true };
  }

  private validate(message: any ) {
    const answer = message.customMessage.text;
    // tempolary logic. I want to connect dialogflow
    return PLACES.includes(answer)
      ? { isValid: true }
      : { isValid: false, error: '空港がある地名を入力してください。' };
  }
}
