import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YMetric } from "./metrics.entity";
import { YandexProject } from "./yandex-project.entity";
import { YData } from "./data.entity";


@Entity('y_query')
export class YQuery {

    @PrimaryGeneratedColumn()
    id: number

    @Column("simple-array")
    totals: number[][]

    @Column()
    type_dimention: string

    @ManyToOne((type) => YandexProject, (data) => data.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: "project_id" }])
    project: YandexProject


    @OneToMany((type) => YData, (y) => y.query, {
        cascade: true,
    })
    @JoinColumn([{ name: "data_id" }])
    data: YData[]
}
