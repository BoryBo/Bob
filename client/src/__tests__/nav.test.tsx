import { render, screen, act } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';

describe('Router Test', () => {
  test('full app rendering/navigating', async () => {
    render(<BrowserRouter>
      <App />
    </BrowserRouter>)
    // verify page content for default route
    expect(screen.getByText(/Bob/)).toBeInTheDocument();
    // verify page content for expected route after navigating
    act(() => userEvent.click(screen.getByText('Employees')));
    expect(screen.getByText(/Name/)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByText('Shift Types')));
    expect(screen.getByText(/Abbreviation/)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByText('Shifts')));
    expect(screen.getByText(/28/)).toBeInTheDocument();

    act(() => userEvent.click(screen.getByText('Rota')));
    expect(screen.getByText(/28/)).toBeInTheDocument();
  })
})


