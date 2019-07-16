import { createTextMessage } from '../utils/message-converter';
import { Question, Questions, Bot} from './types';
import Starter from './dialogs/starter';
import AirLineType from './dialogs/airline-type';
import Departure from './dialogs/departure';
import Arrival from './dialogs/arrival';
import Search from './dialogs/search';
import FlightTicketList from './dialogs/flight-ticket-list';
import FlightTicketListConfirm from './dialogs/flight-ticket-list-confirm';
import Profile from './dialogs/profile';
import FlightSeatPreConfirm from './dialogs/flight-seat-pre-confirm';
import FlightSeat from './dialogs/flight-seat';
import FlightSeatConfirm from './dialogs/flight-seat-confirm';
import PurchasePreConfirm from './dialogs/purchase-pre-confirm';
import Purchase from './dialogs/purchase';
import PurchasePdf from './dialogs/purchase-pdf';

export default class FlightTicketRegisterBot implements Bot {
  public questions: Questions;
  public offset: number;
  public datas: any;
  public registerFunc: Function;

  constructor(registerFunc: Function, initialData: any) {
    // TODO Consider if we can exclude in Bot Class.
    this.offset = 0;
    this.datas = initialData || {};
    this.registerFunc = registerFunc;
    // TODO I want to handle more complicated questions order.
    this.questions = [
      new Starter(this, registerFunc),
      new AirLineType(this, registerFunc),
      new Departure(this, registerFunc),
      new Arrival(this, registerFunc),
      new Search(this, registerFunc),
      new FlightTicketList(this, registerFunc),
      new FlightTicketListConfirm(this, registerFunc),
      new Profile(this, registerFunc),
      new FlightSeatPreConfirm(this, registerFunc),
      new FlightSeat(this, registerFunc),
      new FlightSeatConfirm(this, registerFunc),
      new PurchasePreConfirm(this, registerFunc),
      new Purchase(this, registerFunc),
      new PurchasePdf(this, registerFunc),
    ];
  }

  /***********************/
  /* Question Operation  */
  /**********************/
  public getCurrentQuestion() {
    return this.questions[this.offset];
  }

  public hasNextQuestion() {
    const lastIndex = this.questions.length - 1;
    return this.offset + 1 <= lastIndex;
  }

  public async nextQuestion(): Promise<boolean> {
    if (this.hasNextQuestion()) {
      console.log('あるよ');
      this.offset++;
      // 質問だけで終わるケースも考慮する
      const hasNext = await this.execQuestion();
      console.log('hasNext = ', hasNext);
      if (!hasNext) {
        await this.registerFunc(createTextMessage('ご予約を終了いたします。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
        this.restart();
      }

      return hasNext;
    } else {
      console.log('ないよ');
      if (this.questions.length - 1 === this.offset) {
        await this.registerFunc(createTextMessage('ご予約を終了いたします。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
      } else {
        await this.registerFunc(createTextMessage('処理を中断します。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
      }
      this.backToSquareOne();
      return false;
    }
  }

  public async execQuestion(): Promise<boolean> {
    const q = this.getCurrentQuestion();
    if (q) {
      const hasNext = await q.exec();
      return hasNext;
    }
    return false;
  }

  // return true = hasNext
  // return false = end
  public async reactionToAnwer(message: any): Promise<boolean> {
    console.log('reactionToAnwer');
    const q: Question = this.getCurrentQuestion();
    if (!q) {
      return true;
    }

    const validationResult = await q.validateAnswer(message);

    if (!validationResult.isValid) {
      await this.registerFunc(createTextMessage(validationResult.error));
      await this.registerFunc(createTextMessage('もう一度入力してください。'));
      return true;
    }

    const postProcessResult = await q.postProcess(message);
    if (!postProcessResult.success) {
      await this.registerFunc(createTextMessage(postProcessResult.error));
      await this.registerFunc(createTextMessage('もう一度入力してください。'));
      return true;
    }

    const hasNext = await this.nextQuestion();
    return hasNext;
  }

  public backToSquareOne() {
    this.offset = 0;
  }

  /***********************/
  /* Data Operation  */
  /**********************/
  public saveData(key: string, value: any): void {
    this.datas[key] = value;
  }

  public updateData(key: string, value: any): any {
    this.datas[key] = value;
  }

  public getData(key: string): any {
    return this.datas[key];
  }

  public deleteData(key: string): any {
    delete this.datas[key];
  }

  public deleteDataAll(): void {
    this.datas = {};
  }

  public saveDatas(datas: [{ key: string, value: any }]): void {
    datas.forEach((data) => this.saveData(data.key, data.value));
  }

  public restart(): void {
    this.backToSquareOne();
    this.deleteDataAll();
  }
}
