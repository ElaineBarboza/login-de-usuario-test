import 'cypress-xpath'; //importando a biblioteca XPATH

//VARIÁVEIS GLOBAIS de configuração
const URL_LOGIN = 'https://the-internet.herokuapp.com/login';
const URL_SECURE = 'https://the-internet.herokuapp.com/secure';

//VARIÁVEIS GLOBAIS de valores
const USERNAME = 'tomsmith';
const PASSWORD = 'SuperSecretPassword!';

//Nome da especificação de testes (SPEC)
describe('Login de usuários', () => {

  //Cenário de teste (1)
  it('Login de usuário com sucesso', () => {

    //ARRANGE
    //Comando para abrir uma página web
    cy.visit(URL_LOGIN);

    //ARRANGE
    //Preenchendo os campos do formulário
    cy.xpath('//*[@id="username"]').type(USERNAME)
    cy.xpath('//*[@id="password"]').type(PASSWORD)

    //ACT
    //Clicar no botão de acesso ao sistema
    cy.xpath('//*[@id="login"]/button').click();

    //ASSERT
    //Verificando se a mensagem de sucesso é exibida
    cy.xpath('//*[@id="flash"]').should('contain.text', 
              'You logged into a secure area!');

    //ASSERT
    //Verificando se o usuário foi redirecionado para a página correta
    cy.url().should('eq', URL_SECURE);

    //EVIDÊNCIAS:
    cy.screenshot('Login de usuários com sucesso', { overwrite : true })

  })

  //Cenário de teste (2)
  it('Verificar nome de usuário inválido', () => {

    //ARRANGE
    //Acessar a página de login de usuários do sistema
    cy.visit(URL_LOGIN);

    //ARRANGE
    //Preencher o campo de nome do usuário com um valor inválido
    cy.xpath('//*[@id="username"]').type('usuarioteste');

    ///ARRANGE
    //Preencher o campo de senha do usuário
    cy.xpath('//*[@id="password"]').type(PASSWORD);

    //ACT
    //Clicar no botão de login
    cy.xpath('//*[@id="login"]/button').click();

    //ASSERT
    //Verificações de teste (Resultado esperado == Resultado obtido)
    cy.xpath('//*[@id="flash"]').should('contain.text', 
            'Your username is invalid!');

    //Gerando uma evidência do teste
    cy.screenshot('Verificar nome de usuário inválido', 
                  { overwrite : true });

  })

  //Cenário de teste (3)
  it('Verificar senha de usuário inválida', () => {
    
    //ARRANGE
    //Acessar a página de login do sistema
    cy.visit(URL_LOGIN);

    //ARRANGE
    //Preencher o nome do usuário com valor correto
    cy.xpath('//*[@id="username"]').type(USERNAME);

    //ARRANGE
    //Preencher a senha do usuário com valor inválido
    cy.xpath('//*[@id="password"]').type('Teste1234!');

    //ACT
    //Clicar no botão de login
    cy.xpath('//*[@id="login"]/button').click();

    //ASSERT
    //Verificar a mensagem exibida pelo sistema
    cy.xpath('//*[@id="flash"]').should('contain.text', 
        'Your password is invalid!');

    //EVIDÊNCIA
    cy.screenshot('Verificar senha de usuário inválida', 
       { overwrite : true })
  })

})

