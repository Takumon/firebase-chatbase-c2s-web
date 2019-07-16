import { Question, Bot} from '../types';
import {
  createFlightSeatFormMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class FlightSeat implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    await this.registerFunc(createFlightSeatFormMessage());
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const seats = message.customMessage.contents;
    // No nead to register seats in API because next confirmation follow it
    this.bot.saveData(DATA_TYPE.SELECTED_SEAT, seats);
    return { success: true };
  }

  private validate(message: any ) {
    const seats = message.customMessage.contents;
    // TODO seats validation
    return { isValid: true };
  }
}
