import { Test, TestingModule } from "@nestjs/testing";
import { Artist } from "../entities/artist.entity";
import { ArtistRepository } from "../repositories/artist.repository";
import { ArtistService } from "../services/artist.service";
import { ArtistsController } from "./artists.controller";

describe("ArtistsController", () => {
  let controller: ArtistsController;
  const mockArtistService = {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockImplementation((artist, patchData) => {
      const patched = { ...artist, ...patchData };
      return patched;
    }),
    delete: jest.fn().mockImplementation((artist) => {
      return artist = undefined;
    }),
  };
  const mockArtistRepository = {
    findOne: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistsController],
      providers: [ArtistService, ArtistRepository],
    })
      .overrideProvider(ArtistService)
      .useValue(mockArtistService)
      .overrideProvider(ArtistRepository)
      .useValue(mockArtistRepository)
      .compile();

    controller = module.get<ArtistsController>(ArtistsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findById", () => {
    it("should throw NotFoundException: Artist not found", async () => {
      mockArtistRepository.findOne = jest.fn(() => {
        return null;
      });

      try {
        async () => await controller.findById(123);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error).toHaveProperty("message", "Artist not found");
      }
    });

    it("should return an artist", async () => {
      const artist = { id: 123 };
      mockArtistRepository.findById = jest.fn(() => {
        const artistObj = new Artist();
        artistObj.id = 123;
        return artistObj;
      });
      expect(await controller.findById(123)).toEqual(artist);
    });
  });

  describe("findAll", () => {
    it("should return all the artists", async () => {
      const artist1 = {};
      const artist2 = {};
      mockArtistService.getAll = jest.fn(() => {
        return [new Artist(), new Artist()];
      });
      expect(await controller.findAll({})).toEqual([artist1, artist2]);
      expect(mockArtistService.getAll).toHaveBeenCalledWith({});
      expect(mockArtistService.getAll).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should throw NotFoundException: Artist not found", async () => {
      try {
        mockArtistRepository.findById = jest.fn(() => {
          return null;
        });
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error).toHaveProperty("message", "Artist not found");
      }
    });

    it("should update artist name", async () => {
      const patchData = new Artist();
      patchData.artistName = "Updated Artist";

      mockArtistRepository.findById = jest.fn(() => {
        const artistObj = new Artist();
        artistObj.id = 123;
        artistObj.artistName = "Old Artist";
        return artistObj;
      });

      // patchData has same id as artistObj, update artistName
      expect(await controller.update(123, patchData)).toEqual({
        data: { artistName: "Updated Artist", id: 123 },
        message: "Artist updated",
      });
      expect(mockArtistService.update).toBeCalledTimes(1);
    });
  });

  describe("post", () => {
    it("should post new artist", async () => {
      const postData = new Artist();
      postData.artistName = "New Artist";

      expect(await controller.create(postData)).toEqual({
        message: "Artist Successfully added",
      });
      expect(mockArtistService.create).toHaveBeenCalledWith(postData);
      expect(mockArtistService.create).toBeCalledTimes(1);
    });
  });

  describe("delete", () => {
    it("should delete a new artist", async () => {
      mockArtistRepository.findById = jest.fn(() => {
        const artist = new Artist();
        artist.id = 123;
        return artist;
      });

      expect(await controller.delete(123)).toEqual({
        message: "Artist successfully deleted",
      });
      expect(mockArtistService.delete).toHaveBeenCalledWith(123);
      expect(mockArtistService.delete).toBeCalledTimes(1);
    });
  });
});
