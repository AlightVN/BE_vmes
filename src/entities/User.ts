import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  static find() {
      throw new Error("Method not implemented.");
  }
  static create(arg0: { username: any; role: any; }) {
      throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "varchar" })
  @Column()
  name: string;
  
  @Column({ unique: true, type: "varchar" })
  @Column()
  role: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
