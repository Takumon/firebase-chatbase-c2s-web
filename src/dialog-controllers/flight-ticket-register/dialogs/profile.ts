import { Question, Bot} from '../types';
import {
  createProfileFormMessage,
} from '../../utils/message-converter';
import {
  ValidationResult,
  PostProcessResult,
  DATA_TYPE,
} from '../types';

export default class Profile implements Question {
  public bot: Bot;
  public registerFunc: Function;

  constructor(bot: Bot, registerFunc: Function) {
    this.bot = bot;
    this.registerFunc = registerFunc;
  }

  public async exec(): Promise<boolean> {
    await this.registerFunc(createProfileFormMessage());
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const formData = message.customMessage.contents;
    // TODO REGISTER Profile or fetch it from API

    this.bot.saveData(DATA_TYPE.CONDITON_PROFILE, formData);
    return { success: true };
  }

  private validate(message: any ) {
    const formData = message.customMessage.contents;

    const errors: string[] = [];
    if (!formData.lastName) {
      errors.push('名前(氏)を入力してください。');
    } else if (formData.lastName >= 50) {
      errors.push('名前(氏)は50文字以内で入力してください。');
    }

    if (!formData.firstName) {
      errors.push('名前(名)を入力してください。');
    } else if (formData.firstName >= 50) {
      errors.push('名前(名)は50文字以内で入力してください。');
    }

    // TODO Validation of phone,
    // TODO Validation of birthday,
    // TODO Validation of sex,

    return errors.length === 0
      ? { isValid: true }
      : { isValid: false, error: errors.join('¥n') };
  }
}
