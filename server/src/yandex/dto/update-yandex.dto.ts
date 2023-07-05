import { PartialType } from '@nestjs/mapped-types';
import { CreateYandexDto } from './create-yandex.dto';

export class UpdateYandexDto extends PartialType(CreateYandexDto) {}
