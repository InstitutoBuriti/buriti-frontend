describe('Perfil de Usuário', () => {
  beforeEach(() => {
    Cypress.config('baseUrl', 'http://localhost:5173');

    cy.intercept('POST', 'http://localhost:5173/api/login', {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173' },
      body: { token: 'mocked-jwt-token', user: { id: 2, name: 'João Aluno', email: 'joao@aluno.com', role: 'aluno' } }
    }).as('login');

    cy.intercept('GET', 'http://localhost:5173/api/ping', {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': 'http://localhost:5173', 
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': '*' 
      },
      body: JSON.stringify({ status: 'ok', message: 'Ping bem-sucedido' })
    }).as('ping');

    cy.intercept('PUT', 'http://localhost:5173/api/users/*', (req) => {
      if (req.body.currentPassword === '12345678') {
        req.reply({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173' },
          body: { success: true, message: 'Perfil atualizado com sucesso!' },
          delay: 5000
        });
      } else if (!req.body.currentPassword || !req.body.name) {
        req.reply({
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173' },
          body: { error: 'Campos obrigatórios não preenchidos' },
          delay: 5000
        });
      } else {
        req.reply({
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173' },
          body: { error: 'Senha atual incorreta' },
          delay: 5000
        });
      }
    }).as('updateProfile');

    cy.intercept('POST', 'http://localhost:5173/api/login', (req) => {
      if (req.body.email === 'joao@aluno.com' && req.body.senha === '12345678') {
        req.reply({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173' },
          body: { token: 'mocked-jwt-token', user: { id: 2, name: 'João Aluno', email: 'joao@aluno.com', role: 'aluno' } }
        });
      } else {
        req.reply({
          statusCode: 401,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5173' },
          body: { error: 'Credenciais inválidas' }
        });
      }
    }).as('login');

    cy.clearLocalStorage();
    cy.clearCookies();

    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mocked-jwt-token');
      win.localStorage.setItem('user', JSON.stringify({ id: 2, name: 'João Aluno', email: 'joao@aluno.com', role: 'aluno' }));
    });

    cy.visit('/entrar');

    cy.get('input[name="email"]', { timeout: 15000 }).should('be.visible').type('joao@aluno.com');
    cy.get('input[name="senha"]', { timeout: 15000 }).should('be.visible').type('12345678');
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click();

    cy.wait('@login', { timeout: 20000 }).then((interception) => {
      console.log('Resposta do login:', interception.response.body);
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.eq('mocked-jwt-token');
        expect(win.localStorage.getItem('user')).to.include('joao@aluno.com');
      });
    });

    cy.url().should('include', '/dashboard', { timeout: 20000 });
    console.log('Interface pronta após simulação da sessão.');

    cy.visit('/profile', { timeout: 20000 });

    cy.get('input[name="name"]', { timeout: 15000 }).should('be.visible');
    console.log('Página de perfil carregada com sucesso.');

    cy.wait(1000); // Pequena pausa para garantir estabilidade
    console.log('Teste pronto para executar os casos it.');
  });

  it('altera apenas o nome e mantém senha', () => {
    console.log('Executando caso: altera apenas o nome e mantém senha');
    cy.get('input[name="name"]', { timeout: 15000 }).clear().type('João Aluno Atualizado');
    cy.get('input[name="currentPassword"]', { timeout: 15000 }).type('12345678');
    cy.get('button[type="submit"]').click();
    cy.wait('@updateProfile', { timeout: 20000 }).then((interception) => {
      console.log('Resposta do updateProfile:', interception.response.body);
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Perfil atualizado com sucesso!');
    });
    cy.wait(5000); // Aguarda o alert
    cy.url().should('include', '/dashboard'); // Aceita o redirecionamento
    cy.visit('/profile', { timeout: 20000 }); // Volta para verificar o campo
    cy.get('input[name="name"]').should('have.value', 'João Aluno Atualizado'); // Verifica na página de perfil
  });

  it('altera somente a senha', () => {
    console.log('Executando caso: altera somente a senha');
    cy.get('input[name="password"]', { timeout: 15000 }).type('novaSenha1');
    cy.get('input[name="confirmPassword"]', { timeout: 15000 }).type('novaSenha1');
    cy.get('input[name="currentPassword"]', { timeout: 15000 }).type('12345678');
    cy.get('button[type="submit"]').click();
    cy.wait('@updateProfile', { timeout: 20000 }).then((interception) => {
      console.log('Resposta do updateProfile:', interception.response.body);
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Perfil atualizado com sucesso!');
    });
    cy.wait(5000); // Aguarda o alert
    cy.url().should('include', '/dashboard'); // Aceita o redirecionamento
    cy.visit('/entrar');
    cy.get('input[name="email"]').type('joao@aluno.com');
    cy.get('input[name="senha"]').type('novaSenha1');
    cy.get('button[type="submit"]').click();
    cy.wait('@login', { timeout: 20000 });
    cy.contains('Sair').should('be.visible');
  });

  it('falha na atualização por senha incorreta', () => {
    console.log('Executando caso: falha na atualização por senha incorreta');
    cy.get('input[name="name"]', { timeout: 15000 }).clear().type('João Aluno Atualizado');
    cy.get('input[name="currentPassword"]', { timeout: 15000 }).type('senhaErrada');
    cy.get('button[type="submit"]').click();
    cy.wait('@updateProfile', { timeout: 20000 }).then((interception) => {
      console.log('Resposta do updateProfile:', interception.response.body);
      expect(interception.response.statusCode).to.eq(400);
      expect(interception.response.body.error).to.eq('Senha atual incorreta');
    });
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Senha atual incorreta');
    });
  });

  it('tentativa de login com senha incorreta', () => {
    console.log('Executando caso: tentativa de login com senha incorreta');
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/entrar');
    cy.get('input[name="email"]', { timeout: 15000 }).should('be.visible').type('joao@aluno.com');
    cy.get('input[name="senha"]', { timeout: 15000 }).should('be.visible').type('senhaErrada');
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click();
    cy.wait('@login', { timeout: 20000 }).then((interception) => {
      console.log('Resposta do login:', interception.response.body);
      expect(interception.response.statusCode).to.eq(401);
      expect(interception.response.body.error).to.eq('Credenciais inválidas');
    });
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Credenciais inválidas');
    });
  });

  it('atualização sem preencher campos obrigatórios', () => {
    console.log('Executando caso: atualização sem preencher campos obrigatórios');
    cy.get('input[name="name"]', { timeout: 15000 }).clear();
    cy.get('input[name="currentPassword"]', { timeout: 15000 }).clear();
    cy.get('button[type="submit"]').click();

    // Verifica se há um alerta ou mensagem de erro no frontend
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Campos obrigatórios não preenchidos');
    });

    // Verifica se a URL permanece na página de perfil (sem redirecionamento)
    cy.url().should('include', '/profile', { timeout: 20000 });

    // Remove o cy.wait('@updateProfile') pois não haverá requisição se a validação falhar
    // Se ainda houver uma requisição, descomente e ajuste conforme necessário:
    // cy.wait('@updateProfile', { timeout: 20000 }).then((interception) => {
    //   console.log('Resposta do updateProfile:', interception.response.body);
    //   expect(interception.response.statusCode).to.eq(400);
    //   expect(interception.response.body.error).to.eq('Campos obrigatórios não preenchidos');
    // });
  });
});
