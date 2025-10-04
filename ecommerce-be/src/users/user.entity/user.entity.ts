import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // LƯU: luôn hash trước khi save

  @Column()
  name: string;

  // Lưu roles dưới dạng chuỗi phân cách (ví dụ: "user,admin")
  @Column('simple-array', { default: 'user' })
  roles: string[]; 

  @CreateDateColumn()
  createdAt: Date;
}
