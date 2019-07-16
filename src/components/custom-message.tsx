import React from 'react';
import {
  MessageTextView,
  MessageLinkView,
  MessageImageView,

  MessageConfirmAppStartView,
  MessageAirLineSearchAirLineView,
  MessageAirLineSearchDepartureView,
  MessageAirLineSearchArrivalView,
  MessageAirLineSearchConfirmView,
  MessageFlightTicketListView,
  MessageFlightTicketListConfirmView,
  MessageProfileView,
  MessageProfileAnswerView,
  MessageFlightSeatPreConfirmView,
  MessageFlightSeatView,
  MessageFlightSeatAnswerView,
  MessageFlightSeatConfirmView,
  MessageFlightTicketPurchasePreConfirmView,
  MessageFlightTicketPurchaseView,
  MessageFlightTicketPurchaseAnswerView,
  MessageFlightTicketPurchasePdfView,
} from '../custom-messages';
import {
  toCustom,
  CUSTOM_MESSAGE_TYPE,
  createAnswerMessage,
  createProfileAnswerMessage,
  createFlightSeatAnswerMessage,
  createFlightTicketAnswerMessage,
  createFlightTicketPurchaseAnswerMessage,
} from '../utils/message-converter';


export default function CustomMessage({
  m,
  registerFunc,
  registerAnswerFunc,
}: {
  m: any,
  registerFunc: Function,
  registerAnswerFunc: Function,
}) {

  const message = toCustom(m)

  const customMessages = {
    [CUSTOM_MESSAGE_TYPE.TEXT] :
      <MessageTextView
        m={message}
        isAnswer={false}
      />,

    [CUSTOM_MESSAGE_TYPE.ANSWER]:
      <MessageTextView
        m={message}
        isAnswer={true}
      />,

    [CUSTOM_MESSAGE_TYPE.LINK]:
      <MessageLinkView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.IMAGE]:
      <MessageImageView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.CONFIRM]:
      <MessageConfirmAppStartView
        m={message}
        answer={(value: any) => {
          registerAnswerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.CONFIRM
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE]:
      <MessageAirLineSearchAirLineView
        m={message}
        answer={(value: any) => {
          registerAnswerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM]:
      <MessageAirLineSearchDepartureView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM]:
      <MessageAirLineSearchArrivalView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.CONFIRMATION]:
      <MessageAirLineSearchConfirmView
        m={message}
        answer={(value: any) => {
          registerAnswerFunc(createAnswerMessage(
            value,
            CUSTOM_MESSAGE_TYPE.CONFIRMATION
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST]:
      <MessageFlightTicketListView
        m={message}
        answer={async (cards: any) => {
          await registerAnswerFunc(createFlightTicketAnswerMessage(
            cards,
            CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST
          ));
        }}
        isAnswer={false}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_ANSWER]:
      <MessageFlightTicketListView
        m={message}
        isAnswer={true}
        answer={() => console.log('No function')}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM]:
      <MessageFlightTicketListConfirmView
        m={message}
        answer={async (cards: any) => {
          await registerAnswerFunc(createAnswerMessage(
            'はい',
            CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.PROFILE_FORM]:
      <MessageProfileView
        m={message}
        answer={async (formData: any) => {
          await registerAnswerFunc(createProfileAnswerMessage(
            formData
          ));
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.PROFILE_ANSWER]:
      <MessageProfileAnswerView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM]:
      <MessageFlightSeatPreConfirmView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM]:
      <MessageFlightSeatView
        m={message}
        answer={async (seats: any) => {
          const messageStr = createFlightSeatAnswerMessage(
            seats
          );
          await registerAnswerFunc(messageStr);
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_ANSWER]:
      <MessageFlightSeatAnswerView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM]:
      <MessageFlightSeatConfirmView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM]:
      <MessageFlightTicketPurchasePreConfirmView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM]:
      <MessageFlightTicketPurchaseView
        m={message}
        answer={async (value: any) => {
          const messageStr = createFlightTicketPurchaseAnswerMessage(value);
          await registerAnswerFunc(messageStr);
        }}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_ANSWER]:
      <MessageFlightTicketPurchaseAnswerView
        m={message}
      />,

    [CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PDF]:
      <MessageFlightTicketPurchasePdfView
        m={message}
      />,
  };



  const customMessage = customMessages[message.customMessage.type];
  if (!customMessage) {
    console.log(m);
    throw new Error(`Invalid message type = ${message.customMessage.type}`)  
  }

  return customMessage;
}
