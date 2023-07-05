import { Test, TestingModule } from '@nestjs/testing';
import { TopvisorController } from './topvisor.controller';
import { TopvisorService } from './topvisor.service';

describe('TopvisorController', () => {
  let controller: TopvisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopvisorController],
      providers: [TopvisorService],
    }).compile();

    controller = module.get<TopvisorController>(TopvisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
