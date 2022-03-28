import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithContext } from '../../../test-utils/testing-library-utils';
import { Options } from './Options';

describe('Scoop and Topping tests', () => {
  test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages: HTMLImageElement[] = await screen.findAllByRole('img', {
      name: /scoop$/i,
    });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => {
      return element.alt;
    });
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('displays image for each topping option from server', async () => {
    render(<Options optionType="toppings" />);

    // find images
    const toppingImages: HTMLImageElement[] = await screen.findAllByRole(
      'img',
      {
        name: /topping$/i,
      },
    );
    expect(toppingImages).toHaveLength(3);

    // confirm alt text of images
    const altText = toppingImages.map((element) => {
      return element.alt;
    });
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });

  test("don't update total if scoops input is invalid", async () => {
    renderWithContext(<Options optionType="scoops" />);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1');

    const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsSubtotal).toBeInTheDocument();
  });
});
