import { Column, Entity, JoinColumn, OneToOne,OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TDynamics } from "./dynamics.entity";
import { TTops } from "./tops.entity";
import { TopvisorProject } from "./topvisor-project.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('t_positions_summary')
export class TPositionsSummary {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({description:"айди проекта"})
    @Column()
    id_project: number
    
    @ApiProperty({description:"средние значения"})
    @Column({type:"simple-array", nullable:true})
    avgs:number[]

    @ApiProperty()
    @Column({nullable:true})
    avg_dynamic:number

    @ApiProperty()
    @Column({nullable:true})
    visibility_dynamic:number

    @ApiProperty({description:"динамика"})
    @OneToOne(() => TDynamics)
    @JoinColumn([{ name: "dynamics_id" }])
    dynamics: TDynamics

    @OneToMany((type)=>TTops, (tops)=>tops.positions_summary)
    @JoinColumn([{ name: "tops_id" }])
    tops:TTops[]

    @OneToOne(() => TopvisorProject)
    @JoinColumn([{ name: "project_id" }])
    project: TopvisorProject
}
