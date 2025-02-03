import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import { store } from '../src/store';
import { HelmetProvider } from 'react-helmet-async';

const Wrapper: React.FC<any> = ({ children }) => ( <HelmetProvider><MemoryRouter><Provider store={store}>{children}</Provider></MemoryRouter></HelmetProvider>);

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
