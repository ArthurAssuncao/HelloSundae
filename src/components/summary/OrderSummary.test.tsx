import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import * as OrderDetails from '../../context/OrderDetails';
import {
  OptionDetailsContext,
  OrderDetailsCounts,
  ResetOrderFunc,
  UpdateItemCountFunc,
  useOrderDetails,
} from '../../context/OrderDetails';
import { OrderSummary } from './OrderSummary';
// import userEvent from '@testing-library/user-event';

const hookOrderDetailsMockEmpty = (): OptionDetailsContext => {
  const mockOrderDetailsData: OrderDetailsCounts = {
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
    totals: {
      scoops: '$0.00',
      toppings: '$0.00',
      grandTotal: '$0.00',
    },
  };
  return [mockOrderDetailsData, jest.fn() as UpdateItemCountFunc, jest.fn() as ResetOrderFunc];
};

const hookOrderDetailsMock = (): OptionDetailsContext => {
  const mockOrderDetailsData: OrderDetailsCounts = {
    scoops: new Map<string, number>([['Vanilla', 2]]),
    toppings: new Map<string, number>([['M&Ms', 1]]),
    totals: {
      scoops: '$2.00',
      toppings: '$1.50',
      grandTotal: '$3.50',
    },
  };
  return [mockOrderDetailsData, jest.fn() as UpdateItemCountFunc, jest.fn() as ResetOrderFunc];
};

jest.mock('../../context/OrderDetails');

// jest.mock('../../context/OrderDetails', () => ({
//   useOrderDetails: hookOrderDetailsMock,
// }));

// const useOrderDetailsMock = jest.requireMock<OptionDetailsContext>('../../context/OrderDetails');
// const useOrderDetailsMock: jest.Mocked<() => OptionDetailsContext> = useOrderDetails;

describe('<OrderSummary />', () => {
  beforeEach(() => {
    (useOrderDetails as jest.Mock<OptionDetailsContext>).mockReturnValueOnce(
      hookOrderDetailsMockEmpty(),
    );
  });

  it('Summary text was rendered', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const summaryText = screen.queryByText('Order Summary');
    expect(summaryText).toBeInTheDocument();
  });

  // shows No scoops ordered if no scoops are ordered
  it('Shows No scoops ordered if no scoops are ordered', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const scoopsValue = screen.queryByText('No scoops ordered');
    expect(scoopsValue).toBeInTheDocument();
  });

  // Button is enable if terms and conditions not checked
  it('Button is enable if terms and conditions not checked', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const buttonSubmit = screen.getByRole('button', { name: /Confirm Order/i });
    const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });

    expect(checkbox).not.toBeChecked();
    expect(buttonSubmit).toBeDisabled();
  });
});

describe('<OrderSummary /> with useOrderDetails mocked', () => {
  beforeEach(() => {
    (useOrderDetails as jest.Mock<OptionDetailsContext>).mockReturnValueOnce(
      hookOrderDetailsMock(),
    );
  });

  // Scoops value is correct and correct elements
  it('Scoops value is correct and correct elements', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const vanillaScoop = screen.getByText('2 Vanilla');

    expect(vanillaScoop).toBeInTheDocument();
  });

  // Toppigns value is correct and correct elements
  it('Toppigns value is correct and correct elements', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const vanillaScoop = screen.getByText('M&Ms');

    expect(vanillaScoop).toBeInTheDocument();
  });

  // Total value is correct
  it('Total value is correct', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const totalValue = screen.getByText(/\$3.50/i);

    expect(totalValue).toBeInTheDocument();
  });

  // Button is enable if terms and conditions checked
  it('Button is enable if terms and conditions checked', () => {
    const spySetOrderPhase = jest.fn();
    render(<OrderSummary setOrderPhase={spySetOrderPhase} />);

    const buttonSubmit = screen.getByRole('button', { name: /Confirm Order/i });
    const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(buttonSubmit).toBeEnabled();
  });
});
