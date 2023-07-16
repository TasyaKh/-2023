import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YMetric } from "./metrics.entity";
import { YandexProject } from "./yandex-project.entity";
import { Query } from "typeorm/driver/Query";
import { YQuery } from "./query.entity";


@Entity('y_data')
export class YData {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    name: string

    @Column({ nullable: true })
    favicon: string


    @OneToMany((type) => YMetric, (y) => y.data, {
        cascade: true,
    })
    @JoinColumn([{ name: "metric_id" }])
    metrics: YMetric[]


    @ManyToOne((type) => YQuery, (qery) => qery.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: "query_id" }])
    query: YQuery

}
