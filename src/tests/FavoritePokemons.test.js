import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('teste se aparece na tela a frase No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
