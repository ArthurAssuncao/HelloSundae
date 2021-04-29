import { cleanup, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { OrderSummary } from './OrderSummary';



describe ('<OrderSummary />', () => {
  afterEach(cleanup);

  it ('Summary text was rendered', () => {
    render (<OrderSummary />);
    const summaryText = screen.queryByText ('Order Summary');
    expect (summaryText).toBeInTheDocument ();
  });
  // Scoops value was rendered correctly
  // it ('Scoops value was rendered correctly', () => {
  //   render (<OrderSummary />);
  //   const scoopsValue = screen.queryByText ('Order Summary');
  //   expect (scoopsValue).toBeInTheDocument ();
  // });
  // Scoops value has a right value
  // Scoops list was rendered
  // Toppings value was rendered correctly
  // Toppings value has a right value
  // Toppings list was rendered
  // Total value

  

});

