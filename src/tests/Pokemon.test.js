import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se card do pokémon tem o link para details', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link).toBeInTheDocument();

    userEvent.click(link);
  });

  test('Teste se esxite um icon de estrela no pokemon favoritado', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });

  it('É exibido na tela um texto com o tipo do pokemon', () => {
    renderWithRouter(<App />);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
  });
});
