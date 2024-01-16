
# Estrutura do Projeto


- 'authmiddleware.js': Middleware para autenticação JWT.
- 'models/': Modelos mongoose para User, Game, Odd, Bet e BettingHistory.
- ?routes/':
    - 'auth.js': Rotas para registro e login de utilizadores.
    - 'bets.js': Rotas relacionadas a apostas.
    - 'games.js': Rotas para operações CRUD em jogos.
    - 'odds.js': Rotas para manipulação de odds.
    - 'users.js': Rotas para informações de perfil do utilizadro.
    - 'server.js': Configuração do servidor Express e inicialização.

# Uso
## Autenticação:
Para registrar um novo usuário, faça uma requisição POST para /api/auth/register.
Para fazer login, faça uma requisição POST para /api/auth/login. O token JWT será retornado.
```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "password123"
}
```
```json
{
  "username": "example_user",
  "password": "password123"
}

```
## Apostas:
Para criar uma nova aposta, faça uma requisição POST para /api/bets com as informações necessárias.
Para obter a lista de apostas de um usuário, faça uma requisição GET para /api/bets.
```json
{
  "gameId": "5f9a28b986e3a47d91f61a1c",
  "oddId": "5f9a28b986e3a47d91f61a1d",
  "betAmount": 50,
  "betType": "teamA"
}
```
## Jogos:
Para obter a lista de jogos, faça uma requisição GET para /api/games.
Para adicionar um novo jogo, faça uma requisição POST para /api/games.
```json
{
  "name": "Partida de Futebol",
  "dateTime": "2024-01-23T18:30:00Z",
  "teamA": "Time A",
  "teamB": "Time B"
}
```
```json
{
  "result": "teamA"
}
```
## Odds:
Para obter a lista de odds, faça uma requisição GET para /api/odds.
Para adicionar uma nova odd, faça uma requisição POST para /api/odds.
```json
{
  "gameId": "5f9a28b986e3a47d91f61a1c",
  "teamAOdd": 1.5,
  "teamBOdd": 2.0,
  "drawOdd": 3.0
}
```
## Perfil do Usuário:
Para obter o perfil do usuário autenticado, faça uma requisição GET para /api/users/profile.
