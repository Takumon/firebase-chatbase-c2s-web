export const CUSTOM_MESSAGE_TYPE = {
  TEXT: 'TEXT',
  CONFIRM: 'CONFIRM',
  CONFIRM_AIR_LINE: 'CONFIRM_AIR_LINE',
  DEPARTURE_FORM: 'DEPERTURE_FORM',
  ARRIVAL_FORM: 'ARRIVAL_FORM',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  ANSWER: 'ANSWER',
  CONFIRMATION: 'CONFIRMATION',
  FLIGHT_TICKET_LIST: 'FLIGHT_TICKET_LIST',
  FLIGHT_TICKET_ANSWER: 'FLIGHT_TICKET_ANSWER',
  FLIGHT_TICKET_CONFIRM: 'FLIGHT_TICKET_CONFIRM',
  PROFILE_FORM: 'PROFILE_FORM',
  PROFILE_ANSWER: 'PROFILE_ANSWER',

  FLIGHT_SEAT_PRE_CONFIRM: 'FLIGHT_SEAT_PRE_CONFIRM', 
  FLIGHT_SEAT_FORM: 'FLIGHT_SEAT_FORM',
  FLIGHT_SEAT_ANSWER: 'FLIGHT_SEAT_ANSWER',
  FLIGHT_SEAT_CONFIRM: 'FLIGHT_SEAT_CONFIRM',

  FLIGHT_TICKET_PURCHASE_PRE_CONFIRM: 'FLIGHT_TICKET_PURCHASE_PRE_CONFIRM',
  FLIGHT_TICKET_PURCHASE_FORM: 'FLIGHT_TICKET_PURCHASE_FORM',
  FLIGHT_TICKET_PURCHASE_ANSWER: 'FLIGHT_TICKET_PURCHASE_ANSWER',
  FLIGHT_TICKET_PURCHASE_PDF: 'FLIGHT_TICKET_PURCHASE_PDF',
};

type Message = {
  customMessage: any
  message: string
}

export function toCustom(m: Message) {
  m.customMessage = JSON.parse(m.message);
  return m;
}

export function toOriginal(m: Message) {
  const result = Object.assign({}, m);
  delete result.customMessage;
  return result;
}

/*****************
 * Type definition
 *****************/

export function createTextMessage(text: string): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.TEXT,
    text,
  });
}

export function createAnswerMessage(
  text: string,
  questionType: string
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.ANSWER,
    questionType,
    text,
  });
}

export function createDepartureFormMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM,
    text: '出発の地域はどこでしょうか',
  });
}

export function createArrivalToMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM,
    text: '到着値は地域はどこでしょうか',
  });
}

export function createConfirmMessage(
  title: string,
  text: string
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRM,
    title,
    text,
  });
}

export function createConfirmAirLineMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE,
    title: '国内線/国際線',
    text: '国内線と国際線のどちらですか？',
  });
}


export function createLinkMessage(
  text: string,
  link: string
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.LINK,
    text,
    link,
  });
}

export function createImageMessage(
  link: string,
  description: string,
  alt: string
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.IMAGE,
    link,
    description,
    alt,
  });
}

export function createConfirmationMessage(contents: Object): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRMATION,
    title: 'フライト予約内容',
    text: '以下の内容でフライトを検索しますか？',
    contents,
  });
}

export function createFlightTicketListMessage(contents: Object): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST,
    title: 'ご希望のフライトを選択してください',
    contents,
  });
}

export function reateFlightTicketConfirmMessage(contents: Object): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST,
    title: 'ご希望のフライトは以下で間違いないでしょうか。',
    contents,
  });
}



export function createFlightTicketAnswerMessage(
  contents: Object,
  questionType: string
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_ANSWER,
    title: 'こちらのフライトを希望します。',
    contents,
    questionType,
  });
}


export function createFlightTicketConfirmMessage(
  title: string,
  contents: Object
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM,
    title,
    contents,
  });
}


export function createProfileFormMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.PROFILE_FORM,
    title: '次にお客様の情報をお伺いします。',
  });
}

export function createProfileAnswerMessage(formData: Object): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.PROFILE_ANSWER,
    questionType: CUSTOM_MESSAGE_TYPE.PROFILE_FORM,
    contents: formData,
  });
}


export function createFlightSeatPreConfirmMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM,
    text: 'お座席を指定しますか？',
  });
}

export function createFlightSeatFormMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM,
    title: '座席を指定してください。',
  });
}

export function createFlightSeatAnswerMessage(seat: any): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_ANSWER,
    title: 'こちらの座席にします。',
    contents: seat
  });
}

export function createFlightSeatConfirmMessage(seat: Object): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM,
    text: '以下の座席でよろしいですか。',
    seat,
  });
}



export function createFlightTicketPurchasePreConfirmMessage(): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM,
    text: '引き続き購入手続きを行いますか?',
  });
}



export function createFlightTicketPurchaseMessage(
  contents: Object
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM,
    title: '購入手続きをしてください。',
    contents,
  });
}

export function createFlightTicketPurchaseAnswerMessage(
  contents: Object
): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM,
    title: '購入しました。',
    contents,
  });
}

export function createFlightTicketPurchasePdfMessage(contents: Object): string {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PDF,
    title: 'お支払いが完了しました。お客様のe-ticketです。',
    contents,
  });
}
