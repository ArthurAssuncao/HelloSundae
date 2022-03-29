import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('App is rendered', () => {
    // render app
    render(<App />);
    const logo = screen.getByRole('img', { name: 'Logo do Hello Sundae' });
    expect(logo).toBeInTheDocument();
  });
});
