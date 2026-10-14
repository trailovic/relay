
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from './HomePage';
import { useServerStore } from '../stores/serverStore';

// Create a mock function with predictable behavior.
const mocks = vi.hoisted(() => ({
  getHealth: vi.fn(),
}));

// Replace the actual API function with our mock.
vi.mock('../services/api', () => ({
  getHealth: mocks.getHealth,
}));

describe('Relay home page', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    useServerStore.setState({
      status: 'idle',
    });
  });

  it('renders the landing page and detects the backend', async () => {
    mocks.getHealth.mockResolvedValue({ status: 'ok' });

    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /your conversation.*your moment/i,
      }),
    ).toBeInTheDocument();

    expect(
      await screen.findByText('Service online'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /create a chat/i,
      }),
    ).toBeDisabled();
  });

  it('shows an unavailable status when the backend fails', async () => {
    mocks.getHealth.mockRejectedValue(
      new Error('Connection failed'),
    );

    render(<HomePage />);

    expect(
      await screen.findByText('Service unavailable'),
    ).toBeInTheDocument();
  });
});