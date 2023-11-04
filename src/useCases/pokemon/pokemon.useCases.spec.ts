import { pokemonFixture } from 'src/fixtures';
import { PokemonRepository } from 'src/repositories';
import { adaptPokemonToPlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.utils';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';

describe('PokemonUseCases', () => {
  describe('getAll', () => {
    it('should call repository function', async () => {
      const repository = { getAll: jest.fn() } as unknown as PokemonRepository;
      const useCases = new PokemonUseCases(repository);
      const fixtures = [
        pokemonFixture(),
        pokemonFixture(),
        pokemonFixture(),
      ].map(adaptPokemonToPlainPokemonRepositoryOutput);

      const getAllSpy = jest
        .spyOn(repository, 'getAll')
        .mockResolvedValue(fixtures);

      const result = await useCases.getAll();

      expect(getAllSpy).toHaveBeenCalledTimes(1);
      expect(getAllSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(fixtures);
    });
  });

  describe('getPlainById', () => {
    it('should call repository function', async () => {
      const repository = {
        getPlainById: jest.fn(),
      } as unknown as PokemonRepository;
      const useCases = new PokemonUseCases(repository);
      const fixture = adaptPokemonToPlainPokemonRepositoryOutput(
        pokemonFixture(),
      );

      const getPlainByIdSpy = jest
        .spyOn(repository, 'getPlainById')
        .mockResolvedValue(fixture);

      const result = await useCases.getPlainById(fixture.id);

      expect(getPlainByIdSpy).toHaveBeenCalledTimes(1);
      expect(getPlainByIdSpy).toHaveBeenCalledWith(fixture.id);

      expect(result).toStrictEqual(fixture);
    });
  });
});
