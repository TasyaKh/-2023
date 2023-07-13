import { Column, Entity, JoinColumn, OneToOne,OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TDynamics } from "./dynamics.entity";
import { TTops } from "./tops.entity";
import { TopvisorProject } from "./topvisor-project.entity";

@Entity('t_positions_summary')
export class TPositionsSummary {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_project: number
    
    @Column({type:"simple-array"})
    avgs:number[]

    @Column()
    avg_dynamic:number

    @Column()
    visibility_dynamic:number

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
