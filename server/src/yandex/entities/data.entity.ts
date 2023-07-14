import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YMetric } from "./metrics.entity";


@Entity('y_data')
export class YData {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    project_id: number

    @Column()
    name: string

    @Column({ nullable: true })
    favicon: string

    @Column()
    type_dimention: string


    @OneToMany((type) => YMetric, (y) => y.data, {
        cascade: true,
    })
    
    @JoinColumn([{ name: "metric_id" }])
    metrics: YMetric[]
}
