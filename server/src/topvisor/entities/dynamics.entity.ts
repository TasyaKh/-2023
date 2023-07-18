import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TPositionsSummary } from "./positions_summary.entity";

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

    @OneToOne(() => TPositionsSummary)
    ps: TPositionsSummary
}
