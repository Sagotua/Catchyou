import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeContext';

function TestButton() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle</button>;
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    // ensure clean state
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  test('toggles root class between dark and light', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestButton />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);

    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });
});
