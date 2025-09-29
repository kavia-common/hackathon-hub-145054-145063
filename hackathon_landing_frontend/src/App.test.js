import { render, screen } from '@testing-library/react';
import App from './App';

test('renders HackthonWave branding', () => {
  render(<App />);
  const branded = screen.getAllByText(/HackthonWave/i)[0];
  expect(branded).toBeInTheDocument();
});
