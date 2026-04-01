import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        type: 'varchar', name: 'first_name', nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar', name: 'last_name', nullable: false
    })
    lastName: string;

    @Column({
        type: 'varchar', name: 'email', nullable: false, unique: true
    })
    email: string;

    @Column({
        type: 'varchar', name: 'password', nullable: false
    })
    password: string;

    /*
    * Create and Update Date Columns
    */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt!: Date;
}