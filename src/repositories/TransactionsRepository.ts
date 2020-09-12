import Transaction from '../models/Transaction';

interface CreateTransictionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome} = this.transactions.reduce(
      (accumulator : Balance, transaction : Transaction) => {
        if ( transaction.type === 'income') {
          accumulator.income = transaction.value + accumulator.income;
        } else if (transaction.type === 'outcome'){
          accumulator.outcome = transaction.value + accumulator.outcome;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total};
  }

  public create({ title, type, value }: CreateTransictionDTO): Transaction {
    // TODO
    const transiction = new Transaction({ title, value, type });

    this.transactions.push(transiction);
    return transiction;
  }
}

export default TransactionsRepository;
