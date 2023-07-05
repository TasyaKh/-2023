import { Test, TestingModule } from '@nestjs/testing';
import { TopvisorService } from './topvisor.service';

describe('TopvisorService', () => {
  let service: TopvisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopvisorService],
    }).compile();

    service = module.get<TopvisorService>(TopvisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
