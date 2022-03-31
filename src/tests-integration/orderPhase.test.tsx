import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

describe('Order Phases for happy path', () => {
  test('Order Phase happy path working', async () => {
    // render app
    render(<App />);
    const logo = screen.getByRole('img', { name: 'Logo do Hello Sundae' });
    expect(logo).toBeInTheDocument();

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla input',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const memsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    userEvent.click(memsCheckbox);

    // find and click order button
    const buttonSubmit = screen.getByRole('button', { name: /Order Sundae/i });
    expect(buttonSubmit).toBeEnabled();

    userEvent.click(buttonSubmit);

    // check summary information based on order
    const summaryHeading = screen.getByRole('heading', {
      name: 'Order Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', {
      name: /Toppings: \$1.50/i,
    });
    expect(toppingsHeading).toBeInTheDocument();

    // accept terms and conditions and click button to confirm order
    const vanillaScoop = screen.getByText('1 Vanilla');
    const memsToppings = screen.getByText('M&Ms');

    expect(vanillaScoop).toBeInTheDocument();
    expect(memsToppings).toBeInTheDocument();

    // confirm order number on confirmation page
    const termsCheckbox = screen.getByRole('checkbox', {
      name: /Terms and Conditions/i,
    });
    userEvent.click(termsCheckbox);

    const confirmOrderButton = screen.getByRole('button', {
      name: /Confirm Order/i,
    });
    userEvent.click(confirmOrderButton);

    // Loading while order number is loading from server
    const orderConfirmationLoading = await screen.findByRole('heading', {
      name: /Loading.../i,
    });
    expect(orderConfirmationLoading).toBeInTheDocument();

    // order number is loaded from server
    const thankYouHeader = await screen.findByRole('heading', {
      name: /Thank you/i,
    });
    expect(thankYouHeader).toBeInTheDocument();

    // Loading disappears when order number is loaded from server
    const orderConfirmationLoadingDisappear = screen.queryByRole('heading', {
      name: /Loading.../i,
    });
    expect(orderConfirmationLoadingDisappear).not.toBeInTheDocument();

    const orderNumber = screen.getByText(/Order Number/i);
    expect(orderNumber).toBeInTheDocument();

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /New Order/i });
    userEvent.click(newOrderButton);

    // check that scoops and toppings subtotals have been reset
    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    // wait for items to appear so that Testing Library doesn't get angry about happening after test is over
    await screen.findByRole('spinbutton', { name: 'Vanilla input' });
    await screen.findByRole('checkbox', { name: 'M&Ms' });

    // do we need to await anuthin to avoid test erros?
  });

  test('Topping header is not on sumarry page if no toppings ordered', async () => {
    render(<App />);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla input',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate input',
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    const orderSummaryButton = screen.getByRole('button', {
      name: /Order Sundae/i,
    });
    userEvent.click(orderSummaryButton);

    const scoopsHeading = screen.getByRole('heading', {
      name: /Scoops: \$6.00/i,
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.queryByRole('heading', {
      name: /Toppings/i,
    });
    expect(toppingsHeading).not.toBeInTheDocument();
  });
});
