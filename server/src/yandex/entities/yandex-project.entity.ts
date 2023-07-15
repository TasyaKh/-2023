import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { YData } from "./data.entity";


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

    @OneToMany((type) => YData, (data) => data.project, {
       cascade:true,
    })
    @JoinColumn([{ name: "yandex" }])
    yandex: YandexProject
}
