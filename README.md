# Energy Management API

## 1. Instale as Dependências

```bash
npm install

## 2. Variáveis de Ambiente

PORT="3003"

MYSQL_USER="bd-user-energy"
MYSQL_HOST="127.0.0.1"
MYSQL_PASSWORD="energy1234"
MYSQL_DATABASE="bd_energy"
MYSQL_PORT="3306"

## 3. Execute o Docker Compose

docker-compose up -d


## 4. Compilação e Execução

# Desenvolvimento
npm run start

# Modo watch
npm run start:dev

# Produção
npm run start:prod


## 5. Estrutura do Projeto

unidade Entity
lead Entity
consumo Entity
energy Service
energy Controller
DTOs (SolicitarSimulacaoDeCompensacaoEnergeticaInput)


## 6. Uso da API

#Criar uma nova Simulação

URL: http://localhost:3003/tasks

POST /energy > JSON {
  "nomeCompleto": "João Silva",
  "email": "joao.silva@example.com",
  "telefone": "123456789",
  "informacoesDaFatura": [
    {
      "codigoDaUnidadeConsumidora": "12345",
      "modeloFasico": "monofasico",
      "enquadramento": "AX",
      "historicoDeConsumoEmKWH": [
        {
          "consumoForaPontaEmKWH": 100,
          "mesDoConsumo": "2024-10"
        }
      ]
    }
  ]
}


# Consultas Filtro e Opcionais

URL: http://localhost:3003/energy?codigoDaUnidadeConsumidora=444&nomeCompleto=Jefferson&email=jefferson.meira@teste.com

Query : codigoDaUnidadeConsumidora > nomeCompleto > email

GET /energy

# Consultas com Id

URL: http://localhost:3003/energy/1

PUT /energy/:id


## 8. Tecnologias Utilizadas

Tecnologias Utilizadas
NestJS
TypeORM
Docker e Docker Compose









```
