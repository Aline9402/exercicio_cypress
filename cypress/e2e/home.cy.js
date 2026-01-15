/// <reference types="cypress" />

describe('Testes para a Home Page', () => {
    // Como a url se repete, colocamos no beforeEach para visitar antes de cada teste
    beforeEach(() => {
        cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
    })

    // Teste 1: Inclusão
    it('Deve incluir um novo contato na lista', () => {
        // Digita nos campos (usando os placeholdes ou types como seletores)
        cy.get('input[type="text"]').type('Gian Souza')
        cy.get('input[type="email"]').type('gian@ebac.com.br')
        cy.get('input[type="tel"]').type('11912345678')
        
        // Clica no botão de adicionar
        cy.get('.adicionar').click()

        // Validação (Assert): Verifica se o nome aparece na lista
        cy.contains('Gian Souza').should('be.visible')
        cy.contains('gian@ebac.com.br').should('be.visible')
        cy.contains('11912345678').should('be.visible')
    })

    // Teste 2: Alteração
    it('Deve alterar um contato existente', () => {
        // Primeiro adiciona um contato para garantir que existe algo para editar
        cy.get('input[type="text"]').type('Maria Silva')
        cy.get('input[type="email"]').type('maria@ebac.com.br')
        cy.get('input[type="tel"]').type('11987654321')
        cy.get('.adicionar').click()
        
        // Aguarda o contato aparecer
        cy.contains('Maria Silva').should('be.visible')
        
        // Clica no botão de editar do contato recém-criado
        cy.contains('Maria Silva').parent().find('.edit').click()

        // Verifica se os campos foram preenchidos para edição e altera o nome
        cy.get('input[type="text"]').should('have.value', 'Maria Silva')
        cy.get('input[type="text"]').clear().type('Maria Silva Editada')
        cy.get('input[type="email"]').clear().type('maria.editada@ebac.com.br')
        
        // Clica no botão de alterar
        cy.get('.alterar').click()

        // Validação: Verifica se o nome atualizado consta na lista
        cy.contains('Maria Silva Editada').should('be.visible')
        cy.contains('maria.editada@ebac.com.br').should('be.visible')
        cy.contains('Maria Silva').should('not.exist')
    })

    // Teste 3: Remoção
    it('Deve remover um contato da lista', () => {
        // Adiciona um contato para garantir que existe algo para remover
        cy.get('input[type="text"]').type('Pedro Santos')
        cy.get('input[type="email"]').type('pedro@ebac.com.br')
        cy.get('input[type="tel"]').type('11955556666')
        cy.get('.adicionar').click()
        
        // Aguarda o contato aparecer
        cy.contains('Pedro Santos').should('be.visible')
        
        // Remove o contato
        cy.contains('Pedro Santos').parent().find('.delete').click()

        // Validação: Verifica se o contato NÃO existe mais
        cy.contains('Pedro Santos').should('not.exist')
    })
})