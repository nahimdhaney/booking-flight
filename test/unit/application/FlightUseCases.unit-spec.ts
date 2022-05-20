import { Test } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { FlightFactoryService, FlightServices } from 'src/application/useCases/flight';
import { IDataServices } from 'src/application/abstracts/data-services.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('FlightsUseCases Test', () => {
  let dataServices: IDataServices;
  let flightFactoryService: FlightFactoryService;
  let eventEmitter: EventEmitter2;
  let flightServices: FlightServices; 
  // const POST = new Post('Title', 'Text', null, 1);
  // const POST2 = new Post('Title2', 'Text2', null, 1);
  // const USER = new User('John Doe', 'john.doe@gmail.com', [POST], 1);
  // const USER2 = new User('John Doe', 'john.doe@gmail.com', [POST, POST2], 1);

  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FlightServices,
        {
          provide: IDataServices,
          useFactory: () => ({
            save: jest.fn(() => true),
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            update: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
        
      ],
    }).compile();

    dataServices = module.get<IDataServices>(IDataServices);
    postsUseCases = module.get<PostsUseCases>(PostsUseCases);
  });

  it('shoud return a list of posts when the users have the posts in  getAllPostsByUser', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);
    const posts = await postsUseCases.getAllPostsByUser(1);

    expect(posts).toHaveLength(1);
    expect(posts).toStrictEqual([POST]);
  });

  it('shoud return a empty list when user has no post in getAllPostsByUser', async () => {
    const user = new User('', '', null, 1);
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);

    const posts = await postsUseCases.getAllPostsByUser(1);

    expect(posts).toHaveLength(0);
    expect(posts).toStrictEqual([]);
  });

  it('shoud throw NotFoundException when the user is not found in getAllPostsByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await postsUseCases.getAllPostsByUser(2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });

  it('shoud get a post when a valid user has a post in getPostByUser', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);

    const post = await postsUseCases.getPostByUser(1, 1);

    expect(post instanceof Post).toBeTruthy();
    expect(post).toStrictEqual(POST);
  });

  it('shoud throw NotFoundException when not user is found in getPostByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await postsUseCases.getPostByUser(2, 1);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });

  it('shoud throw NotFoundException when user there are not post in getPostByUser', async () => {
    try {
      const user = new User('', '', null, 1);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => user);
      await postsUseCases.getPostByUser(1, 1);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The post {1} wasn't found.");
    }
  });

  it('shoud throw NotFoundException when the post not exists in getPostByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => USER);
      await postsUseCases.getPostByUser(1, 99);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The post {99} wasn't found.");
    }
  });

  it('should create a post when user and post is valis in createPost', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);
    jest.spyOn(usersRepository, 'save').mockImplementation(async () => USER2);

    const post = await postsUseCases.createPost(1, POST2);

    expect(post instanceof Post).toBeTruthy();
    expect(post).toStrictEqual(POST2);
  });

  it('should throw NotFoundException when the user not exists in createPost', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await postsUseCases.createPost(2, POST2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });
});