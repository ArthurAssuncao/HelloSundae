import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import App from './App';

// fix issue #26749. See more: https://github.com/vercel/next.js/issues/26749
jest.mock('next/image');

describe('App component', () => {
  beforeEach(() => {
    (Image as jest.Mock<JSX.Element>).mockReturnValueOnce(
      <img src="" alt="" aria-label="Logo do Hello Sundae" />,
    );
  });
  test('App is rendered', () => {
    // render app
    render(<App />);
    const logo = screen.getByRole('img', { name: 'Logo do Hello Sundae' });
    expect(logo).toBeInTheDocument();
  });
});
