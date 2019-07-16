export interface Bot {
    questions: Questions;
    offset: number;
    datas: object;
    registerFunc: Function;

    getCurrentQuestion(): Question;
    hasNextQuestion(): boolean;
    reactionToAnwer(message: any): Promise<boolean>; // isDetacheBot
    backToSquareOne(): void;
    nextQuestion(): Promise<boolean>; // isDetachBot
    execQuestion(): Promise<boolean>; // isDetachBot

    saveData(key: string, value: any): void;
    updateData(key: string, value: any): any; // return updatedValue
    getData(key: string): any; // return current value
    deleteData(key: string): any; // return deleted value(old value)
    deleteDataAll(): void;
    saveDatas(datas: [{ key: string, value: any }]): void;
    restart(): void; // delete all datas and retry from first question.
  }

export interface ValidationResult {
  isValid: boolean;
  error?: any;
}

export interface PostProcessResult {
  success: boolean;
  error?: any;
  result?: any;
}

export interface Question {
  bot: Bot;
  registerFunc: Function;
  exec(): Promise<boolean>;
  validateAnswer(message: any): Promise<ValidationResult>;
  postProcess(message: any): Promise<PostProcessResult>;
}

export interface Questions extends Array<Question> {}

export const DATA_TYPE = {
  CONDITON_AIRELINE_TYPE: 'CONDITON_AIRELINE_TYPE',
  CONDITON_NUMBER_OF_PASSENGERS: 'CONDITON_NUMBER_OF_PASSENGERS',
  CONDITON_DEPARTURE: 'CONDITON_DEPARTURE',
  CONDITON_ARRIVAL: 'CONDITON_ARRIVAL',
  CONDITON_DEPARTURE_DATE: 'CONDITON_DEPARTURE_DATE',
  CONDITON_ARRIVAL_DATE: 'CONDITON_ARRIVAL_DATE',
  CONDITON_SELECTED_FLIGHT: 'CONDITON_SELECTED_FLIGHT',
  CONDITON_PROFILE: 'CONDITON_PROFILE',
  SELECTED_SEAT: 'SELECTED_SEAT',
  PURCHASE: 'PURCHASE',
};
