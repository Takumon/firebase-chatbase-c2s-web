import { Question, Bot} from '../types';
import {
  createFlightTicketListMessage,
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
    const condition = {
      airline: this.bot.getData(DATA_TYPE.CONDITON_AIRELINE_TYPE),
      numberOfPassengers: this.bot.getData(DATA_TYPE.CONDITON_NUMBER_OF_PASSENGERS),
      departureLocation: this.bot.getData(DATA_TYPE.CONDITON_DEPARTURE),
      arrivalLocation : this.bot.getData(DATA_TYPE.CONDITON_ARRIVAL),
      departureDate: this.bot.getData(DATA_TYPE.CONDITON_DEPARTURE_DATE),
      arrivateDate : this.bot.getData(DATA_TYPE.CONDITON_ARRIVAL_DATE)
    };
    const result = await fetchTicketList(condition);
    await this.registerFunc(createFlightTicketListMessage(result));
    return true;
  }

  public async validateAnswer(message: any): Promise<ValidationResult> {
    return this.validate(message);
  }

  public async postProcess(message: any): Promise<PostProcessResult> {
    const answer = message.customMessage.contents;
    this.bot.saveData(DATA_TYPE.CONDITON_SELECTED_FLIGHT, answer);
    return { success: true };
  }

  private validate(message: any ) {
    // TODO Defining validation logic
    const [ selectedFlight ] = message.customMessage.contents;
    console.log('選んだフライト', selectedFlight);
    return { isValid: true };
  }
}

async function fetchTicketList(condition: any): Promise<any> {
  // TODO Call API
  return [
    {
      id: '9b8810c8-18e8-4c8f-99ce-2a96915a21ab',
      selectable: true,
      date: '12/28(木)',
      routes: [
        {
          seats: '○',
          flightName: 'TL002',
          depart: {
            airport: 'HND',
            airportJapanese: '羽田',
            dateTime: '19:45'
          },
          arrival: {
            airport: 'SFO',
            airportJapanese: 'サンフランシスコ',
            dateTime: '12:00'
          }
        }
      ],
      price: '￥156,000',
      tax: '￥17,320',
      time: '9時間 15分',
      milage: '5130マイル'
    },
    {
      id: '90ddd38a-0ab1-4e44-bcbf-699fc51d7381',
      selectable: true,
      date: '12/28(木)',
      routes: [
        {
          seats: '△',
          flightName: 'TL012',
          depart: {
            airport: 'NRT',
            airportJapanese: '成田',
            dateTime: '11:50'
          },
          arrival: {
            airport: 'DFW',
            airportJapanese: 'ダラス・フォートワース',

            dateTime: '08:05'
          }
        },
        {
          seats: '7',
          flightName: 'TL7577',
          depart: {
            airport: 'DFW',
            airportJapanese: 'ダラス・フォートワース',
            dateTime: '11:10'
          },
          arrival: {
            airport: 'SFO',
            airportJapanese: 'サンフランシスコ',
            dateTime: '13:14'
          }
        }
      ],
      price: '￥166,500',
      tax: '￥17,320',
      time: '18時間 24分',
      milage: '7904マイル'
    },
    {
      id: '9f06f070-d434-4a20-bfec-05a71902ad4f',
      selectable: true,
      date: '12/28(木)',
      routes: [
        {
          seats: '7',
          flightName: 'TL7016',
          depart: {
            airport: 'NRT',
            airportJapanese: '成田',
            dateTime: '18:45'
          },
          arrival: {
            airport: 'LAX',
            airportJapanese: 'ロサンゼルス',
            dateTime: '11:45'
          }
        },
        {
          seats: '7',
          flightName: 'TL7556',
          depart: {
            airport: 'LAX',
            airportJapanese: 'ロサンゼルス',
            dateTime: '14:00'
          },
          arrival: {
            airport: 'SFO',
            airportJapanese: 'サンフランシスコ',
            dateTime: '15:30'
          }
        }
      ],
      price: '￥199,000',
      tax: '￥17,320',
      time: '13時間 45分',
      milage: '5797マイル'
    }
  ];
}
