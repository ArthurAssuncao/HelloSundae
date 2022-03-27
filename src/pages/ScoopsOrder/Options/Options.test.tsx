import { render, screen } from '@testing-library/react';
import { Options } from './Options';

describe('Scoop tests', () => {
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
});
