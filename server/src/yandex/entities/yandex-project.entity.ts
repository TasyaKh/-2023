import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { YData } from "./data.entity";
import { YQuery } from "./query.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('yandex_project')
export class YandexProject {

    @ApiProperty()
    @PrimaryColumn()
    id: number

    @ApiProperty({description:"имя проекта"})
    @Column()
    name: string

    @ApiProperty({description:"сайт"})
    @Column()
    site: string

    @ApiProperty({description:"дата создания"})
    @Column()
    create_time: Date

    @ApiProperty({description:"дата последнео обновления"})
    @Column({ default: new Date() })
    date_last_update: Date

    @OneToMany((type) => YQuery, (y) => y.project, {
        cascade: true,
    })
    @JoinColumn([{ name: "query_id" }])
    query: YQuery[]
}