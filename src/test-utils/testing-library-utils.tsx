import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { OrderDetailsProvider } from '../context/OrderDetails';

const renderWithContext = (
  ui: JSX.Element,
  options?: RenderOptions,
): RenderResult => {
  return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

export { renderWithContext };
