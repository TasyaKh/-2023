import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FindProjectsTopvisorDto {

    @ApiProperty({description:"ид проекта",required:false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    project_id: number

    @ApiProperty({description:"отобразить регионы и поисковики", required:false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    show_searchers_and_regions: number

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber()
    limit: number

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber()
    offset: number

    @ApiProperty({description:"текст для поиска", required:false})
    @IsOptional()
    search_string: string

    @ApiProperty({description:"фильтры", required:false})
    @IsOptional()
    orders = []
}

