import { Question, Bot} from '../types';
import {
  reateFlightTicketConfirmMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class FlightTicketList implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    const result = this.bot.getData(DATA_TYPE.CONDITON_SELECTED_FLIGHT);
    await this.registerFunc(reateFlightTicketConfirmMessage(result));
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const selectedFlight = this.bot.getData(DATA_TYPE.CONDITON_SELECTED_FLIGHT);
    // TODO Where is it best to execute registation
    const { result, error } = await registerFlight(selectedFlight);

    if (error) {
      // TODO Error handling
      return { success: false, error };
    }

    return { success: true, result };
  }

  private validate(message: any ) {
    const answer = message.customMessage.text;
    return answer === 'はい' ? { isValid: true }
      : answer === 'いいえ' ? { isValid: true }
      : { isValid: false, error: '「はい」か「いいえ」を指定してください。' };
  }
}

async function registerFlight(fileght: any): Promise<any> {
  return {
    result: '成功したよ',
    error: null
  };
}
