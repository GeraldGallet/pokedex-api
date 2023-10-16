import { pokemonFixture } from 'src/fixtures';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';
import { adaptPokemonToPlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.utils';
import { DataSource } from 'typeorm';

describe('PokemonRepository', () => {
  describe('getAll', () => {
    it.skip('should return all pokemons', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new PokemonRepository(dataSource);

      const pokemons = [pokemonFixture(), pokemonFixture(), pokemonFixture()];

      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(pokemons);

      const result = await repository.getAll();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { identifier: 'ASC' },
        relations: { types: { type: true } },
      });

      expect(result).toStrictEqual(
        pokemons.map(adaptPokemonToPlainPokemonRepositoryOutput),
      );
      expect(true).toBeFalsy();
      expect(null).toBeNull();
    });
  });
});
