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
    update: jest
      .fn()
      .mockImplementation((id, patchData) => ({ id, ...patchData })),
  };
  const mockArtistRepository = {
    findOne: jest.fn(),
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

      expect(async () => {
        await controller.findById(123);
      }).rejects.toThrow("Artist not found");
    });

    it("should return a artist", async () => {
      const artist = { id: 123 };
      mockArtistRepository.findOne = jest.fn(() => {
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
      const patchData = new Artist();
      mockArtistRepository.findOne = jest.fn(() => {
        return null;
      });

      expect(async () => {
        await controller.update(123, patchData);
      }).rejects.toThrow("Artist not found");
    });

    it("should update artist name", async () => {
      const patchData = new Artist();
      patchData.artistName = "Updated Artist";

      mockArtistRepository.findOne = jest.fn(() => {
        const artistObj = new Artist();
        artistObj.id = 123;
        artistObj.artistName = "Old Artist";
        return artistObj;
      });

      expect(await controller.update(123, patchData)).toEqual({
        data: { artistName: "Updated Artist", id: 123 },
        message: "Artist updated",
      });
      expect(mockArtistService.update).toHaveBeenCalledWith(123, patchData);
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
});
