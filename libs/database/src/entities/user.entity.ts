import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../types";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        type: 'varchar', name: 'first_name', nullable: false
    })
    firstName!: string;

    @Column({
        type: 'varchar', name: 'last_name', nullable: false
    })
    lastName!: string;

    @Column({
        type: 'varchar', name: 'email', nullable: false, unique: true
    })
    email!: string;

    @Column({
        type: 'varchar', name: 'password', nullable: false
    })
    password!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Customer,
    })
    role!: UserRole;

    @Column({
        type: 'text', name: 'refresh_token', nullable: true
    })
    refreshToken?: string;

    @Column({
        name: 'reset_token',
        nullable: true
    })
    resetToken?: string;

    @Column({
        name: 'is_blocked',
        default: false
     })
    isBlocked!: boolean;

    @Column({
        name: 'is_deleted',
        default: false
     })
    isDeleted!: boolean;

    /*
    * Create and Update Date Columns
    */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt!: Date;
}