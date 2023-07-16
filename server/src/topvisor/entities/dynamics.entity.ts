import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_dynamics')
export class TDynamics {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({description:"айди проекта"})
    @Column()
    id_project: number
    
    @ApiProperty({description:"динамика все"})
    @Column({nullable:true})
    all: number

    @ApiProperty({description:"динамика поднялась"})
    @Column({nullable:true})
    up: number

    @ApiProperty()
    @Column({nullable:true})
    stay: number

    @ApiProperty({description:"динамика упала"})
    @Column({nullable:true})
    down: number

}
