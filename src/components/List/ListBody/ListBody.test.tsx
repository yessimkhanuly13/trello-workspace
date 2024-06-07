import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import ListBody from './ListBody';

// Mock the BoardCard component
vi.mock('../../Card', () => ({
  default: ({ data, listId }) => (
    <div>
      {data.title}
    </div>
  ),
}));

describe('ListBody', () => {
  it('renders list body with cards', () => {
    const list = {
      id: 'list-1',
      cards: [
        { id: 'card-1', title: 'Card 1' },
        { id: 'card-2', title: 'Card 2' },
      ],
    };

    render(<ListBody list={list} />);
    screen.debug()
  });
});