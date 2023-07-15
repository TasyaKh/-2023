import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YMetric } from "./metrics.entity";
import { YandexProject } from "./yandex-project.entity";


@Entity('y_data')
export class YData {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    name: string

    @Column({ nullable: true })
    favicon: string

    @Column()
    type_dimention: string


    @ManyToOne((type) => YandexProject, (data) => data.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: "project_id" }])
    project: YandexProject


    @OneToMany((type) => YMetric, (y) => y.data, {
        cascade: true,
    })
    @JoinColumn([{ name: "metric_id" }])
    metrics: YMetric[]
}
