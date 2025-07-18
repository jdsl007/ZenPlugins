import { convertTransaction } from '../../../converters'

describe('convertTransaction', () => {
  it.each([
    [
      {
        id: '55003192954451',
        amount: {
          amount: -80,
          currIso: 'BYN'
        },
        date: '2020-04-07T15:58:44',
        description: 'MINSK Получение денег в банкомате ATMALF HO07 KOMAROVSKI',
        operationAmount: null,
        cardMask: '5.4451',
        status: 'normal',
        number: 'BY73 ALFA 3014 7106 1900 9027 0000',
        operationType: null
      },
      {
        hold: false,
        date: new Date('2020-04-07T15:58:44+03:00'),
        movements: [
          {
            id: '55003192954451',
            account: { id: 'account' },
            invoice: null,
            sum: -80,
            fee: 0
          },
          {
            id: null,
            account: {
              type: 'cash',
              instrument: 'BYN',
              company: null,
              syncIds: null
            },
            invoice: null,
            sum: 80,
            fee: 0
          }
        ],
        merchant: null,
        comment: null
      }
    ],
    [
      {
        id: '55003192954451',
        title: 'ATM N44 POLYMYA BIB',
        amount: {
          amount: -100,
          currIso: 'BYN'
        },
        date: '2020-05-29T10:27:47',
        description: 'PINSK BLR',
        operationAmount: null,
        cardMask: '5.8797',
        status: 'normal',
        number: 'BY73 ALFA 3014 7106 1900 9027 0000',
        operationType: null
      },
      {
        hold: false,
        date: new Date('2020-05-29T10:27:47+03:00'),
        movements: [
          {
            id: '55003192954451',
            account: { id: 'account' },
            invoice: null,
            sum: -100,
            fee: 0
          },
          {
            id: null,
            account: {
              type: 'cash',
              instrument: 'BYN',
              company: null,
              syncIds: null
            },
            invoice: null,
            sum: 100,
            fee: 0
          }
        ],
        merchant: null,
        comment: null
      }
    ],
    [
      {
        id: null,
        title: 'Снятие наличных',
        amount: {
          amount: -400,
          currIso: 'BYN'
        },
        date: '2020-09-01T15:31:21',
        description: 'С 3014780286001 НА 1011800185840 Выплата НИКОЛАЕВ Н.Н. согласно РВО № 2 от 01.09.2020 085',
        operationAmount: null,
        cardMask: null,
        status: 'normal',
        number: 'BY73 ALFA 3014 7106 1900 9027 0000',
        operationType: null
      },
      {
        hold: false,
        date: new Date('2020-09-01T15:31:21+03:00'),
        movements: [
          {
            id: null,
            account: { id: 'account' },
            invoice: null,
            sum: -400,
            fee: 0
          },
          {
            id: null,
            account: {
              type: 'cash',
              instrument: 'BYN',
              company: null,
              syncIds: null
            },
            invoice: null,
            sum: 400,
            fee: 0
          }
        ],
        merchant: null,
        comment: null
      }
    ]
  ])('converts cash withdrawal', (apiTransaction, transaction) => {
    expect(convertTransaction(apiTransaction, {
      id: 'account',
      instrument: 'BYN',
      syncID: ['BY73ALFA30147106190090270000']
    })).toEqual(transaction)
  })
})
