import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FindProjectsDto {

    @IsOptional()
    @IsNumber()
    limit:number

    @IsOptional()
    @IsNumber()
    offset:number

    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    search_string:string

    // @IsOptional()
    // filters:string[]

    // topvisor
    @IsOptional()
    orders = []
}

