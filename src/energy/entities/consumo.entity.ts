import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Unidade } from './unidade.entity';

@Entity('consumo')
export class Consumo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  consumoForaPontaEmKWH: number;

  @Column()
  mesDoConsumo: Date;

  @ManyToOne(() => Unidade, (unidade) => unidade.historicoDeConsumoEmKWH)
  unidade: Unidade;
}
