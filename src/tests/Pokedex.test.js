import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém texto Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test(
    'Teste se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado:',
    () => {
      renderWithRouter(<App />);
      const btn = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(btn).toBeInTheDocument();

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();

      userEvent.click(btn);
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();
    },
  );

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnFilters = [
      'Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btnAll = screen.getAllByTestId('pokemon-type-button');
    btnAll.forEach((element, index) => {
      expect(element.innerHTML).toEqual(btnFilters[index]);
    });
  });

  it('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(button);
  });
});
