export class LoanRequestDTO {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createLowRiskRequest(): LoanRequestDTO {
    return new LoanRequestDTO(20000, 0, 30, true, 500, 12)
  }

  static createMediumRiskRequest(): LoanRequestDTO {
    return new LoanRequestDTO(20000, 0, 30, true, 500, 6)
  }

  static createHighRiskRequest(): LoanRequestDTO {
    return new LoanRequestDTO(100, 0, 17, true, 1000, 12)
  }

  static createInvalidLoanRequest(): LoanRequestDTO {
    return new LoanRequestDTO(0, -20, 10, false, 10000, 72)
  }

  static createExtremelyLargeLoanRequest(): LoanRequestDTO {
    return new LoanRequestDTO(10000, 0, 35, true, 10000000, 24)
  }

  static createVeryShortLoanPeriodRequest(): LoanRequestDTO {
    return new LoanRequestDTO(3000, 0, 26, true, 500, 1)
  }

  static createVeryOldApplicantRequest(): LoanRequestDTO {
    return new LoanRequestDTO(900, 0, 95, false, 1000, 12)
  }

  static createHighIncomeUnemployedRequest(): LoanRequestDTO {
    return new LoanRequestDTO(12000, 0, 40, false, 5000, 12)
  }
}
