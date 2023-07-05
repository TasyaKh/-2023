import { Optional } from "@nestjs/common";
import { IsNumber } from "class-validator";

export class FindProjectsDto {

    @Optional()
    @IsNumber()
    limit:number = 2

    @Optional()
    @IsNumber()
    offset:number = 0
}
