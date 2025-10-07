import cheerio from 'cheerio'
import { AccountInfo, AccountTransaction } from './types'
import moment from 'moment'
import { isValidDate } from '../../common/dateUtils'
import { createHash } from 'crypto'

const exchangeRateRegex = /\d+\.\d+ \w{3} Kurs:.+/

export function parseLoginResult (body: string): boolean {
  return body.includes('location.href = action;')
}

export function parseAccountInfo (body: string): AccountInfo[] {
  const html = cheerio.load(body)
  const accountsHtml = html('#account-slider').find('.slide')
  const accounts: AccountInfo[] = []

  // eslint-disable-next-line array-callback-return
  accountsHtml.toArray().map(accountHtml => {
    const $ = cheerio.load(accountHtml)

    const invoiceAccounts: Array<{ currency: string, balance: string | undefined }> = []
    $('select[data-utility="customselectMenu"] option').each((index, element) => {
      const currency = $(element).text().trim() // Валюта
      const balance = $(element).attr('data-amount') // Баланс
      invoiceAccounts.push({ currency, balance })
    })

    for (const invoiceAccount of invoiceAccounts) {
      const id = (accountHtml as cheerio.TagElement).attribs['data-accountnumber'].trim()
      const account = {
        id: invoiceAccounts.length > 1 ? id + invoiceAccount.currency : id,
        cardNumber: (accountHtml as cheerio.TagElement).attribs['data-cardno'].trim(),
        accountNumber: (accountHtml as cheerio.TagElement).attribs['data-accno'].trim(),
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        name: $('.acc-name').text().trim() || $('.acc-nr').text().trim(),
        currency: invoiceAccount.currency,
        balance: invoiceAccount.balance !== undefined
          ? parseFloat(invoiceAccount.balance.replace(/\./g, '').replace(',', '.'))
          : 0
      }
      accounts.push(account)
    }
  })
  return accounts
}

export function parseRequestVerificationToken (body: string): string {
  const html = cheerio.load(body)
  const token = html('input[name="__RequestVerificationToken"]').val()

  return token
}

export function parseTransactions (body: string, fromDate: Date, accountId?: string): AccountTransaction[] {
  const html = cheerio.load(body)
  const transactionsHtml = html('#transaction-view-content').find('.pageable-content')

  // Counter for duplicate transactions (to distinguish multiple purchases with same parameters)
  const seenTransactions = new Map<string, number>()

  return transactionsHtml.toArray().map(transactionHtml => {
    const html = cheerio.load(transactionHtml)

    const [dateHtml, , descriptionHtml, amountHtml] = html('div').children('div').toArray()

    const direction = cheerio.load(dateHtml)('div.tag').hasClass('up') ? -1 : 1
    const date = moment(cheerio.load(dateHtml)('p').text()?.trim(), 'DD.MM.YYYY').toDate()
    let address = cheerio.load(descriptionHtml)('span').text()?.trim().replace(/ {2}/g, '').replace('Kartica: ', '')
    const [amount, currency] = cheerio.load(amountHtml)('p').text().trim().split(' ') ?? []

    const description = address?.match(exchangeRateRegex)?.[0] ?? ''
    address = address?.replace(description ?? '', '').trim()

    const normalizedAmount = direction * Number(amount.replace(/,/g, ''))
    const normalizedDate = isValidDate(date) ? date : fromDate

    // Generate stable ID based on fields that DON'T change during pending->executed transition:
    // - Amount - stays the same
    // - Address/merchant - stays the same
    // - Currency - stays the same
    // - Account ID - to distinguish transactions on different accounts
    // - Date with 3-day window - to distinguish transactions at different times
    // - Counter - to distinguish multiple identical purchases within the same period

    // Use 3-day window: if date shifts by 1-2 days during pending->executed, ID remains the same
    const dateKey = Math.floor(normalizedDate.getTime() / (3 * 24 * 60 * 60 * 1000))

    const baseIdString = [
      accountId ?? 'unknown',
      normalizedAmount.toFixed(2),
      currency ?? 'RSD',
      address ?? '',
      dateKey.toString()
    ].join('|')

    // Count how many times we've seen this transaction
    const count = seenTransactions.get(baseIdString) ?? 0
    seenTransactions.set(baseIdString, count + 1)

    // Add counter to ID to distinguish multiple identical transactions
    const idString = count > 0 ? `${baseIdString}|${count}` : baseIdString
    const stableId = createHash('md5').update(idString).digest('hex').substring(0, 16)

    // Debug logging for ID generation debugging
    console.debug('[Transaction ID]', {
      id: stableId,
      date: normalizedDate.toISOString().split('T')[0],
      amount: normalizedAmount,
      address: address?.substring(0, 30),
      dateKey,
      count,
      idString: idString.substring(0, 50) + '...'
    })

    return {
      id: stableId,
      date: normalizedDate,
      address,
      amount: normalizedAmount,
      currency,
      description
    }
  })
}
