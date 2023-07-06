import { Optional } from "@nestjs/common";
import { IsNumber, IsOptional } from "class-validator";

export class FindProjectsYandexDto {

    // Количество счетчиков, которые вы хотите получить.Значение по умолчанию: 1000, limit
    @IsOptional()
    @IsNumber()
    per_page: number

    @IsOptional()
    @IsNumber()
    offset: number

    @IsOptional()
    search_string:string
}
