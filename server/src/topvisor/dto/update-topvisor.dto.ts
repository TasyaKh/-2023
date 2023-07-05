import { PartialType } from '@nestjs/mapped-types';
import { CreateTopvisorDto } from './create-topvisor.dto';

export class UpdateTopvisorDto extends PartialType(CreateTopvisorDto) {}
