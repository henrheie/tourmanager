import { render, screen } from '@testing-library/react';
import { BudgetBar } from '../components/BudgetBar';

describe('BudgetBar', () => {
  it('shows remaining budget', () => {
    render(<BudgetBar spent={10} />);
    expect(screen.getByText(/90 mill/)).toBeInTheDocument();
  });
});
