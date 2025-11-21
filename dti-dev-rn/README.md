# Notas – Prof. Carlos

## Instruções para executar o sistema

- Back-end (Java / Spring Boot)
  - Abrir um terminal na pasta do back-end.
  - Executar: `mvn spring-boot:run` (ou `./mvnw spring-boot:run` se o wrapper estiver no projeto).
  - A API sobe em `http://localhost:8080`.  

- Front-end (React Native / Expo)
  - Abrir outro terminal na pasta do front-end (por exemplo `dti-dev-rn`).
  - Instalar dependências: `npm install` ou `yarn`.
  - Iniciar o app: `npx expo start`.
  - Para testar na web: pressionar `w` no terminal do Expo e usar o navegador.
  - Observação para dispositivo físico: para consumir a API pelo celular é necessário usar o IP da máquina em vez de `localhost` na URL do `fetch`
 

## Lista de premissas assumidas

- A aplicação não utiliza banco de dados; todos os dados vivem em memória enquanto o sistema está rodando.
- Cada aluno possui exatamente 5 notas e uma frequência em porcentagem (0 a 100).
- Não há funcionalidades de edição ou deleção de alunos cadastrados.
- Não há autenticação ou perfis de usuário; qualquer pessoa com acesso à aplicação pode cadastrar e visualizar alunos.


## Decisões de projeto

- Front-end desenvolvido em React Native com Expo, usando TypeScript e Expo Router. Interface de uma página só, responsiva, com layout simples e foco nas funcionalidades requeridas.
- Validações feitas no front:
  - campos obrigatórios (nome, 5 notas, frequência);
  - notas entre 0 e 10 e frequência entre 0 e 100;
  - exibição de mensagens de erro no formulário.
- Destaque visual: textos em verde para situações OK (acima/na média, frequência ok) e em vermelho para alertas (abaixo da média, frequência < 75%).
- Back-end desenvolvido em Java com os modelos (Aluno, Aluno Processado, Relatorio e Relatorio Requerido). Utilizando a arquitetura MVC. Back-end utiliza o framework springboot. Back-end é uma API RestFull.


  
