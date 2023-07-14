import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_dynamics')
export class TDynamics {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_project: number
    
    @Column({nullable:true})
    all: number

    @Column({nullable:true})
    up: number

    @Column({nullable:true})
    stay: number

    @Column({nullable:true})
    down: number

}
