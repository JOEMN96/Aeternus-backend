import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
    // SuperTokens userId
    @Column({ nullable: false, unique: true })
    userId: string;

    @Column({ length: 25 })
    first_name: string;

    @Column({ length: 25 })
    last_name: string;

    @Column()
    dob: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column()
    city: string;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @Column({ length: 1 })
    gender: string;
}
