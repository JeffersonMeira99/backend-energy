import { Module } from '@nestjs/common';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumo } from './entities/consumo.entity';
import { Lead } from './entities/lead.entity';
import { Unidade } from './entities/unidade.entity';
import { EnergiaDecodingModule } from '../pdf/energy-decoding.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consumo, Lead, Unidade]),
    EnergiaDecodingModule,
  ],
  controllers: [EnergyController],
  providers: [EnergyService],
})
export class EnergyModule {}
