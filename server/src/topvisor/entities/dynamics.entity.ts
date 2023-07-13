import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_dynamics')
export class TDynamics {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_project: number
    
    @Column()
    all: number

    @Column()
    up: number

    @Column()
    stay: number

    @Column()
    down: number

}
