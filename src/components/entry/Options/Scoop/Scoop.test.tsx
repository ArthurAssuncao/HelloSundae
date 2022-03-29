import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoopComp } from './Scoop';

describe('Scoop tests', () => {
  test('Scoops input allows only valid values, range 0 to 10', () => {
    const spy = jest.fn();
    render(<ScoopComp name="test" imagePath="test" updateItemCount={spy} />);

    // expect input to be invalid with negative number
    const scoopInput = screen.getByRole('spinbutton', { name: 'test' });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, '-1');
    expect(scoopInput).toHaveClass('is-invalid');

    // invalid with decimal input
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, '2.5');
    expect(scoopInput).toHaveClass('is-invalid');

    // invalid with non-empty input
    userEvent.clear(scoopInput);
    // userEvent.type(scoopInput, '');
    expect(scoopInput).toHaveClass('is-invalid');

    // invalid with non-numeric input
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, 'r');
    expect(scoopInput).toHaveClass('is-invalid');

    // invalid with too large number
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, '11');
    expect(scoopInput).toHaveClass('is-invalid');

    // valid with number range 0 to 10
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, '5');
    expect(scoopInput).not.toHaveClass('is-invalid');
  });
});
