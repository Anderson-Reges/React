import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do pokémon são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const headingDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    const headingSummary = screen.getByRole('heading', {
      name: /summary/i,
    });
    const headingLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(headingDetails).toBeInTheDocument();
    expect(headingSummary).toBeInTheDocument();
    expect(headingLocations).toBeInTheDocument();
  });

  test('Teste se é exibido na tela um texto contendo summary', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/148');
    });

    const text = screen.getByText(
      /they say that if it emits an aura from its whole body/i,
    );
    expect(text).toBeInTheDocument();
  });

  test('Teste se tem uma seção com as localizaçoes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/23');
    });

    const img = screen.getByRole('img', {
      name: /ekans location/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(img).toHaveAttribute('alt', 'Ekans location');
  });

  test('Teste se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/23');
    });

    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
