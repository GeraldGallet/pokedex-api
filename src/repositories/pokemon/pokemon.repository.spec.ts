import { NotFoundException } from 'src/common';
import { pokemonFixture } from 'src/fixtures';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';
import { adaptPokemonToPlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.utils';
import { DataSource } from 'typeorm';

describe('PokemonRepository', () => {
  describe('getAll', () => {
    it('should return all pokemons', async () => {
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
      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });

  describe('findLastPokemon', () => {
    it('should find and adapt last pokemon', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new PokemonRepository(dataSource);

      const fixture = pokemonFixture();

      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue([fixture]);

      const result = await repository.findLastPokemon();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { identifier: 'DESC' },
        take: 1,
        relations: { types: { type: true } },
      });
      expect(result).toStrictEqual(
        adaptPokemonToPlainPokemonRepositoryOutput(fixture),
      );
    });

    it('should not find and return error', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new PokemonRepository(dataSource);

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await repository.findLastPokemon();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { identifier: 'DESC' },
        take: 1,
        relations: { types: { type: true } },
      });

      expect(result).toBeNull();
    });
  });

  describe('getPlainById', () => {
    it('should return found pokemon', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new PokemonRepository(dataSource);

      const fixture = pokemonFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(fixture);

      try {
        const result = await repository.getPlainById(fixture.id);

        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: fixture.id },
          relations: { types: { type: true } },
        });

        expect(result).toStrictEqual(
          adaptPokemonToPlainPokemonRepositoryOutput(fixture),
        );
      } catch {
        expect(true).toBeFalsy();
      }
    });

    it('should not find pokemon', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new PokemonRepository(dataSource);

      const fixture = pokemonFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(null);
      try {
        await repository.getPlainById(fixture.id);

        expect(true).toBeFalsy();
      } catch (err) {
        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: fixture.id },
          relations: { types: { type: true } },
        });

        expect(err).toStrictEqual(
          new NotFoundException(`Pokemon: '${fixture.id}'`),
        );
      }
    });
  });
});
