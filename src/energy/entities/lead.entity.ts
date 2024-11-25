import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Unidade } from './unidade.entity';

@Entity('lead')
export class Lead {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @OneToMany(() => Unidade, (unidade) => unidade.lead, { eager: true })
  unidades: Unidade[];
}
