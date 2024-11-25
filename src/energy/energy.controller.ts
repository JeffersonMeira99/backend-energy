import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { SolicitarSimulacaoDeCompensacaoEnergeticaInput } from './dto/SolicitarSimulacaoDeCompensacaoEnergeticaInput.dto';
import { EnergyService } from './energy.service';

@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post()
  async registrarEnergy(
    @Body() input: SolicitarSimulacaoDeCompensacaoEnergeticaInput,
  ) {
    return this.energyService.registrarSimulacao(input);
  }

  @Get()
  async listarEnergy(@Query() filters: any) {
    return this.energyService.listarSimulacoes(filters);
  }

  @Get(':id')
  async obterEnergyId(@Param('id') id: string) {
    return this.energyService.obterSimulacaoPorId(id);
  }
}
