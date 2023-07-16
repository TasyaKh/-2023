import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { YData } from "./data.entity";
import { YQuery } from "./query.entity";


@Entity('yandex_project')
export class YandexProject {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    site: string

    @Column()
    create_time: Date

    @Column({ default: new Date() })
    date_last_update: Date

    @OneToMany((type) => YQuery, (y) => y.project, {
        cascade: true,
    })
    @JoinColumn([{ name: "query_id" }])
    query: YQuery[]
}