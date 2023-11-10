# Documentação da API BetMaster

Bem-vindo à documentação da API BetMaster. Esta API fornece funcionalidades para um sistema de apostas online.

## Autenticação

A autenticação nesta API é realizada por meio de JSON Web Tokens (JWT). Para obter um token de acesso, faça uma solicitação para o endpoint `/api/auth/login` com as credenciais do usuário. O token deve ser incluído no cabeçalho `Authorization` para acessar recursos protegidos.

### Registro de Usuário

**Endpoint:** `/api/auth/register`

**Método:** `POST`

Registra um novo usuário na plataforma.

#### Parâmetros da Solicitação

- `username` (string): Nome de usuário do novo usuário.
- `password` (string): Senha do novo usuário.

#### Resposta de Sucesso

Status: 201 Created

```json
{
  "message": "Usuário registrado com sucesso."
}
```
### Login de Usuário

**Endpoint:** `/api/auth/login`

**Método:** `POST`

Realiza o login de um usuário existente e retorna um token JWT.

#### Parâmetros da Solicitação
- `username` (string): Nome de usuário do usuário existente.
- `password` (string): Senha do usuário existente.

##### Resposta de Sucesso
- **Status:** 200 OK

```json
{
  "token": "seu-token-jwt-aqui"
}

```

### Usuários - Perfil do Usuário

**Endpoint:** `/api/users/profile`

**Método:** `GET`

Obtém o perfil do usuário autenticado.

#### Parâmetros da Solicitação
Nenhum.

#### Resposta de Sucesso
- **Status:** 200 OK

```json
{
  "username": "nome-de-usuario",
}
```
### Jogos - Lista de Jogos

**Endpoint:** `/api/games`

**Método:** `GET`

Obtém a lista de todos os jogos disponíveis.

#### Parâmetros da Solicitação
Nenhum.

#### Resposta de Sucesso
- **Status:** 200 OK

```json
[
  {
    "name": "Nome do Jogo",
    "dateTime": "Data e hora do jogo",
    "teamA": "Nome do Time A",
    "teamB": "Nome do Time B"
  },
]
```

### Odds - Lista de Odds

**Endpoint:** `/api/odds`

**Método:** `GET`

Obtém a lista de todas as odds disponíveis.

#### Parâmetros da Solicitação
Nenhum.

#### Resposta de Sucesso
- **Status:** 200 OK

```json
[
  {
    "gameId": "ID do Jogo",
    "teamAOdd": 2.5,
    "teamBOdd": 1.8,
    "drawOdd": 3.0
  },
]
```

### Apostas - Criar uma Nova Aposta

**Endpoint:** `/api/bets`

**Método:** `POST`

Cria uma nova aposta para o usuário autenticado.

#### Parâmetros da Solicitação
- `gameId` (string): ID do jogo para o qual a aposta está sendo feita.
- `oddId` (string): ID da odd escolhida para a aposta.
- `betAmount` (number): Valor da aposta.
- `betType` (string): Tipo da aposta ('teamA', 'teamB', 'draw').

#### Resposta de Sucesso
- **Status:** 201 Created

```json
{
  "message": "Aposta criada com sucesso."
}
```

### Histórico de Apostas - Lista de Histórico de Apostas

**Endpoint:** `/api/bettingHistory`

**Método:** `GET`

Obtém o histórico de apostas para o usuário autenticado.

#### Parâmetros da Solicitação

Nenhum.

#### Resposta de Sucesso

**Status:** `200 OK`

```json
[
  {
    "betId": "ID da Aposta",
    "result": "won",
    "wonAmount": 50.0,
    "dateTime": "Data e hora do Histórico"
  },
]
```

### Detalhes do Histórico de Aposta

**Endpoint:** `/api/bettingHistory/:historyId`

**Método:** `GET`

Obtém os detalhes de um histórico de aposta específico.

#### Parâmetros da Solicitação

- `historyId` (string): ID do histórico de aposta.

#### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "betId": "ID da Aposta",
  "result": "won",
  "wonAmount": 50.0,
  "dateTime": "Data e hora do Histórico"
}
```
