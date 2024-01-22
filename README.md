
# Decumentação da API


- 'authmiddleware.js': Middleware para autenticação de token usando JSON Web Token (JWT).
- 'models/': Modelos mongoose para User, Game, Odd, Bet e BettingHistory.
- bet.js (model): Define o modelo (schema) para as apostas.
- bettingsHistory.js (model): Define o modelo para o histórico de apostas.
- game.js (model): Define o modelo para os jogos.
- league.js (model): Define o modelo para as ligas.
- odd.js (model): Define o modelo para as odds.
- user.js (model): Define o modelo para os usuários.
- auth.js (route): Define rotas para autenticação, registro e renovação de token.

- routes:
    - 'bets.js' (route): Define rotas relacionadas a apostas, incluindo criação, obtenção e atualização de resultados.

    - 'games.js' (route): Define rotas relacionadas a jogos, incluindo criação, obtenção, atualização de resultados e remoção.

    - 'leagues.js' (route): Define rotas para manipulação de ligas, incluindo criação.

    - 'odds.js' (route): Define rotas para obtenção, criação e atualização de odds.

    -'users.js' (route): Define rotas relacionadas a usuários, incluindo obtenção de perfil.

-server.js: Configuração principal do servidor Express, conexão com o banco de dados e configuração de rotas.

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
