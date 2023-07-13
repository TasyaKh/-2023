import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FindProjectsTopvisorDto {

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    id: number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    show_searchers_and_regions: number

    @IsOptional()
    @IsNumber()
    limit: number

    @IsOptional()
    @IsNumber()
    offset: number

    @IsOptional()
    search_string: string

    @IsOptional()
    orders = []
}

