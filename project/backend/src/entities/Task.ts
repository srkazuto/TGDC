import {Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn} from 'typeorm';
import {User} from './User'


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id! :number

    @Column()
    title! : string

    @Column()
    @ManyToOne(()=> User, (user) => user.task)
    @JoinColumn({name : 'userID'})
    user! : User;

    @Column({nullable : true})
    description? : string

}