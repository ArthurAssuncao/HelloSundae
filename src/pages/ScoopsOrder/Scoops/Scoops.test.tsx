import { render, screen } from '@testing-library/react';
import { Scoops } from './Scoops';

describe('Scoop tests', () => {
  test('displays image for each scoop option from server', async () => {
    render(<Scoops optionType="scoops" />);

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
});
