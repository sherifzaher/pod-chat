import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestsModule } from '../friend-requests.module';
import { FriendRequestsController } from '../friend-requests.controller';
import { Services } from '../../utils/constants';
import { FriendRequestsService } from '../friend-requests.service';
import { mockUser } from '../../__mocks__';

describe('FriendRequestsModule Testing', () => {
  let controller: FriendRequestsController;
  let service: FriendRequestsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendRequestsController],
      providers: [
        {
          provide: Services.FRIEND_REQUESTS,
          useValue: {
            getFriendRequests: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<FriendRequestsController>(FriendRequestsController);
    service = module.get<FriendRequestsService>(Services.FRIEND_REQUESTS);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('friend requests', () => {
    it('get friend requests', async () => {
      await controller.handleGetFriendRequests(mockUser);
      // expect(service.createFriendRequest).toHaveBeenCalled({
      //   user: mockUser,
      //   email: 'sherifzaher3@gmail.com',
      // });
    });
  });
});
