import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class FindProjectsYandexDto {

    @ApiProperty({description:"Количество счетчиков, которые вы хотите получить.Значение по умолчанию: 1000, limit",required:false})
    @IsOptional()
    @IsNumber()
    per_page: number

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber()
    offset: number

    @ApiProperty({description:"текст для поиска, найти по имени",required:false})
    @IsOptional()
    search_string:string
}
