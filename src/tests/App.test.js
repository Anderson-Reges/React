import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';

const { screen } = require('@testing-library/react');
const { default: App } = require('../App');

describe('Teste o componente app.js', () => {
  test(
    'Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const home = screen.getByRole('link', {
        name: /home/i,
      });
      const about = screen.getByRole('link', {
        name: /About/i,
      });
      const favoritePokemon = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokemon).toBeInTheDocument();
    },
  );

  test(
    'Teste se é redirecionado URL / ao clicar no link Home da barra de navegação;',
    () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', {
        name: /home/i,
      });

      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    },
  );

  test(
    'Teste se é redirecionado URL /about ao clicar no link About da barra de navegação;',
    () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', {
        name: /About/i,
      });

      userEvent.click(about);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    },
  );

  test(
    'Teste se aparece URL /favorites ao clicar no link Favorite Pokémons;',
    () => {
      const { history } = renderWithRouter(<App />);
      const favorites = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });

      userEvent.click(favorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  test(
    'Teste se é redirecionada para a página Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/xablau');
      });

      const notFoundTitle = screen.getByRole('heading', {
        name: /page requested not found/i,
      });
      expect(notFoundTitle).toBeInTheDocument();
    },
  );
});
