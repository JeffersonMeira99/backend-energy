import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Lead } from './lead.entity';
import { Consumo } from './consumo.entity';
import { Exclude } from 'class-transformer';

@Entity('unidade')
export class Unidade {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  codigoDaUnidadeConsumidora: string;

  @Column()
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';

  @Column()
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3';

  @ManyToOne(() => Lead, (lead) => lead.unidades)
  lead: Lead;

  @OneToMany(() => Consumo, (consumo) => consumo.unidade, { eager: true })
  historicoDeConsumoEmKWH: Consumo[];
  @Exclude()
  decodedData?: any;
}
