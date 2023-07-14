import { Column, Entity, PrimaryColumn } from "typeorm";


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
}
