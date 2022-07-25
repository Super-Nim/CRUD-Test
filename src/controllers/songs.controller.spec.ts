import { Test, TestingModule } from "@nestjs/testing";
import { Song } from "../entities/song.entity";
import { SongRepository } from "../repositories/song.repository";
import { SongService } from "../services/song.service";
import { SongsController } from "./songs.controller";

describe("SongsController", () => {
  let controller: SongsController;
  const mockSongsService = {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockSongRepository = {
    findOne: {},
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [SongService, SongRepository],
    })
      .overrideProvider(SongService)
      .useValue(mockSongsService)
      .overrideProvider(SongRepository)
      .useValue(mockSongRepository)
      .compile();

    controller = module.get<SongsController>(SongsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all songs", async () => {
      const song1 = {};
      const song2 = {};
      mockSongsService.getAll = jest.fn(() => {
        return [new Song(), new Song()];
      });
      expect(await controller.findAll({})).toEqual([song1, song2]);
      expect(mockSongsService.getAll).toHaveBeenCalledWith({});
      expect(mockSongsService.getAll).toBeCalledTimes(1);
    });
  });

  describe("findById", () => {
    it("should throw NotFoundException: Song not found", async () => {
      mockSongRepository.findOne = jest.fn(() => {
        return null;
      });

      expect(async () => {
        await controller.findById(123);
      }).rejects.toThrow("Song not found");
    });

    it("should return a song", async () => {
      const song = { id: 123, songTitle: "Test Title" };
      mockSongRepository.findOne = jest.fn(() => {
        const songObj = new Song();
        songObj.id = 123;
        songObj.songTitle = "Test Title";
        return songObj;
      });
      expect(await controller.findById(123)).toEqual(song);
    });
  });

  describe("update", () => {
    it("should throw NotFoundException: Song not found", async () => {
      const patchData = new Song();
      mockSongRepository.findOne = jest.fn(() => {
        return null;
      });

      expect(async () => {
        await controller.update(123, patchData);
      }).rejects.toThrow("Song not found");
    });

    it("should update song title", async () => {
      const patchData = new Song();
      patchData.songTitle = "Updated song title";

      mockSongRepository.findOne = jest.fn(() => {
        const songObj = new Song();
        songObj.id = 123;
        songObj.songTitle = "Old Song";
        return songObj;
      });

      mockSongsService.update = jest.fn(() => {
        return { id: 123, songTitle: "Updated song title" };
      });

      expect(await controller.update(123, patchData)).toEqual({
        data: { songTitle: "Updated song title", id: 123 },
        message: "Song successfully updated",
      });
      expect(mockSongsService.update).toHaveBeenCalledWith(
        { id: 123, songTitle: "Old Song" },
        patchData
      );
      expect(mockSongsService.update).toBeCalledTimes(1);
    });
  });

  describe("post", () => {
    it("should post new songs", async () => {
      const postData = new Song();
      postData.songTitle = "New Song";

      expect(await controller.create(postData)).toEqual({
        message: "Song successfully added",
      });
      expect(mockSongsService.create).toHaveBeenCalledWith(postData);
      expect(mockSongsService.create).toBeCalledTimes(1);
    });
  });

  describe("delete", () => {
    it("should throw NotFoundException: Song not found", async () => {
      mockSongRepository.findOne = jest.fn(() => {
        return null;
      });

      expect(async () => {
        await controller.delete(123);
      }).rejects.toThrow("Song not found");
    });
  });

  it("should delete song", async () => {
    mockSongRepository.findOne = jest.fn(() => {
      return new Song();
    });

    expect(await controller.delete(123)).toEqual({
      message: "Song successfully deleted",
    });
    expect(mockSongsService.delete).toHaveBeenCalledWith(123);
    expect(mockSongsService.delete).toBeCalledTimes(1);
  });
});
