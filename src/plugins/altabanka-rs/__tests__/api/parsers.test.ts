import fs from 'fs'
import path from 'path'
import {
  parseAccountInfo,
  parseLoginResult,
  parseRequestVerificationToken,
  parseTransactions
} from '../../parsers'

describe('parsers', () => {
  it('should parse login result', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/login.html'),
      'utf8'
    )

    const response = parseLoginResult(mockBody)

    expect(response).toBe(true)
    expect(parseLoginResult('some other text')).toBe(false)
  })

  it('should parse accounts-1', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/accounts-1.html'),
      'utf8'
    )

    const response = parseAccountInfo(mockBody)

    expect(response).toEqual(
      [
        {
          accountNumber: '0001000512876',
          balance: 249233.58,
          cardNumber: '0xC4952DBB2BB24ECAFF9655505605F0F0',
          currency: 'RSD',
          id: '0001000512876-0xC4952DBB2BB24ECAFF9655505605F0F0',
          name: '4242XXXXXXXX4061'
        },
        {
          accountNumber: '0001000512876',
          balance: 249233.58,
          cardNumber: '0x3A7A78AB70965C9C2323270A293FA54F',
          currency: 'RSD',
          id: '0001000512876-0x3A7A78AB70965C9C2323270A293FA54F',
          name: '9891XXXXXXXX6625'
        },
        {
          accountNumber: '0001000512876',
          balance: 249233.58,
          cardNumber: '',
          currency: 'RSD',
          id: '0001000512876',
          name: 'Tekući račun'
        },
        {
          accountNumber: '0001000512877',
          balance: 2979.07,
          cardNumber: '',
          currency: 'EUR',
          id: '0001000512877',
          name: 'Štedni račun'
        }
      ]
    )
  })

  it('should parse accounts-2', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/accounts-2.html'),
      'utf8'
    )

    const response = parseAccountInfo(mockBody)

    expect(response).toEqual(
      [
        {
          accountNumber: '0001000210460',
          balance: 450968.42,
          cardNumber: '0xC4952DBB2BB21FC5D03DD70479E08E9D',
          currency: 'RSD',
          id: '0001000210460-0xC4952DBB2BB21FC5D03DD70479E08E9D',
          name: '4242XXXXXXXX6963'
        },
        {
          accountNumber: '0001000210460',
          balance: 450968.42,
          cardNumber: '0x3A7A78AB7096C7A1A4D47503D17609AF',
          currency: 'RSD',
          id: '0001000210460-0x3A7A78AB7096C7A1A4D47503D17609AF',
          name: '9891XXXXXXXX3864'
        },
        {
          accountNumber: '0001000210460',
          balance: 450968.42,
          cardNumber: '',
          currency: 'RSD',
          id: '0001000210460',
          name: 'Tekući račun'
        },
        {
          accountNumber: '0031000248471',
          balance: 0,
          cardNumber: '',
          currency: 'RUB',
          id: '0031000248471RUB',
          name: 'Štedni račun'
        },
        {
          accountNumber: '0031000248471',
          balance: 0,
          cardNumber: '',
          currency: 'EUR',
          id: '0031000248471EUR',
          name: 'Štedni račun'
        }
      ]
    )
  })

  it('should parse accounts-3', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/accounts-3.html'),
      'utf8'
    )

    const response = parseAccountInfo(mockBody)

    expect(response).toEqual(
      [
        {
          accountNumber: '0001000105593',
          balance: 0,
          cardNumber: '0xC4952DBB2BB2101319F376C48E5602EB',
          currency: 'RSD',
          id: '0001000105593-0xC4952DBB2BB2101319F376C48E5602EB',
          name: '4242XXXXXXXX5934'
        },
        {
          accountNumber: '0001000105593',
          balance: 0,
          cardNumber: '0x3A7A78AB70967AB07B514CB30E5FE563',
          currency: 'RSD',
          id: '0001000105593-0x3A7A78AB70967AB07B514CB30E5FE563',
          name: '9891XXXXXXXX6217'
        },
        {
          accountNumber: '0001000105593',
          balance: 0,
          cardNumber: '',
          currency: 'RSD',
          id: '0001000105593',
          name: 'Tekući račun'
        },
        {
          accountNumber: '0031000138757',
          balance: 0,
          cardNumber: '',
          currency: 'CNY',
          id: '0031000138757CNY',
          name: 'Štedni račun'
        },
        {
          accountNumber: '0031000138757',
          balance: 0,
          cardNumber: '',
          currency: 'RUB',
          id: '0031000138757RUB',
          name: 'Štedni račun'
        },
        {
          accountNumber: '0031000138757',
          balance: 542.80,
          cardNumber: '',
          currency: 'EUR',
          id: '0031000138757EUR',
          name: 'Štedni račun'
        }
      ]
    )
  })

  it('should parse accounts-4', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/accounts-4.html'),
      'utf8'
    )

    const response = parseAccountInfo(mockBody)

    expect(response).toEqual(
      [
        {
          accountNumber: '0001000328053',
          balance: 1780241.23,
          cardNumber: '0x8B6259B7CF1CDD4FDF47D31FD86B3C88',
          currency: 'RSD',
          id: '0001000328053-0x8B6259B7CF1CDD4FDF47D31FD86B3C88',
          name: '4029XXXXXXXX4561'
        },
        {
          accountNumber: '0001000328053',
          balance: 1780241.23,
          cardNumber: '0x3A7A78AB70968A5B862BE543D64756ED',
          currency: 'RSD',
          id: '0001000328053-0x3A7A78AB70968A5B862BE543D64756ED',
          name: '9891XXXXXXXX4652'
        },
        {
          accountNumber: '0001000328053',
          balance: 1780241.23,
          cardNumber: '',
          currency: 'RSD',
          id: '0001000328053',
          name: 'Tekući račun'
        },
        {
          accountNumber: '0031000384634',
          balance: 892.43,
          cardNumber: '',
          currency: 'EUR',
          id: '0031000384634',
          name: 'Štedni račun'
        }
      ]
    )
  })

  it('should parse verification token', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/transactions-get.html'),
      'utf8'
    )

    const response = parseRequestVerificationToken(mockBody)

    expect(response).toMatchInlineSnapshot(
      '"gRMs7qlFJfglZXJ6LWt9Rrf7uFmYKVrlUJAw9kZJvP3i_2TyXQT8g09XpquVXaLZEXbWPapfQN8LTUDqEcvgUkBoHok94w-t8dlg88U-nFY1"'
    )
  })

  it('should parse card transactions', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/transactions-post-1.html'),
      'utf8'
    )

    const fromDate: Date = new Date('2025-02-24T00:00:00')
    const response = parseTransactions(mockBody, fromDate)

    expect(response).toHaveLength(10)
    expect(response[0]).toMatchObject({
      address: 'LP ANDREY SERAPIONOV PR BE',
      amount: -5000,
      currency: 'RSD',
      date: new Date('2024-10-11T00:00:00'),
      description: ''
    })
    expect(response[0].id).toHaveLength(16)
    expect(response[1]).toMatchObject({
      address: 'BLVCK SUGAR DOO BE',
      amount: -850,
      currency: 'RSD',
      date: new Date('2024-10-11T00:00:00'),
      description: ''
    })
    expect(response[1].id).toHaveLength(16)
    // Проверяем, что одинаковые транзакции имеют одинаковый ID
    expect(response[5].id).not.toBe(response[6].id) // Две транзакции в H&M с разной суммой
  })

  it('should parse account transactions', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/transactions-post-2.html'),
      'utf8'
    )

    const fromDate: Date = new Date('2025-02-24T00:00:00')
    const response = parseTransactions(mockBody, fromDate)

    expect(response).toHaveLength(19)
    expect(response[0]).toMatchObject({
      address: 'K-ETA 0215663441',
      amount: -7.14,
      currency: 'EUR',
      date: new Date('2024-10-21T00:00:00'),
      description: ''
    })
    expect(response[0].id).toHaveLength(16)

    // Проверяем, что две транзакции "Prodaja deviza" с одинаковой суммой в разные месяцы имеют разные ID
    // (используется 3-дневное окно для даты, чтобы дата могла сдвинуться на 1-2 дня при pending->executed)
    const prodajaTransactions = response.filter(t => t.address === 'Prodaja deviza' && t.amount === -10)
    expect(prodajaTransactions).toHaveLength(2)
    expect(prodajaTransactions[0].id).not.toBe(prodajaTransactions[1].id)
  })

  it('should parse account transactions', async () => {
    const mockBody = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/transactions-post-3.html'),
      'utf8'
    )

    const fromDate: Date = new Date('2025-02-24T00:00:00')
    const response = parseTransactions(mockBody, fromDate)

    expect(response).toHaveLength(3)
    expect(response[0]).toMatchObject({
      address: ';Komunalne usluge',
      amount: -14662.59,
      currency: 'RSD',
      date: new Date('2025-02-24T00:00:00'),
      description: ''
    })
    expect(response[0].id).toHaveLength(16)

    // Проверяем, что две транзакции в одну дату с разной суммой имеют разные ID
    expect(response[0].id).not.toBe(response[1].id)
  })
})
