import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
// import { screen } from '@testing-library/react';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('teste se aparece na tela a frase No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
