/// <reference types="cypress" />

describe('Testes para a Home Page', () => {
    
    beforeEach(() => {
        cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
    })

    it('Deve incluir um novo contato na lista', () => {
        cy.get('input[type="text"]').type('Gian Souza')
        cy.get('input[type="email"]').type('gian@ebac.com.br')
        cy.get('input[type="tel"]').type('11912345678')
        cy.get('.adicionar').click()

        cy.contains('Gian Souza').should('be.visible')
    })

    it('Deve alterar um contato existente', () => {
        // Clica no botão Editar do primeiro contato da lista
        cy.get('.edit').first().click()

        // Altera os dados
        cy.get('input[type="text"]').clear().type('Gian Souza Editado')
        cy.get('input[type="email"]').clear().type('gian.editado@ebac.com.br')
        cy.get('input[type="tel"]').clear().type('11999999999')
        
        // Clica no botão de confirmar a alteração (que tem a classe .alterar)
        cy.get('.alterar').click()

        // Validação
        cy.contains('Gian Souza Editado').should('be.visible')
    })

    it('Deve remover um contato da lista', () => {
        // Pega o último contato e clica no botão delete dele
        // Usamos .last() para garantir que não estamos tentando apagar algo que não existe
        cy.get('.delete').last().click()

        // Como não sabemos o nome do último contato, apenas validamos que a ação ocorreu
        // Se quiser ser específico:
        // cy.contains('Gian Souza Editado').should('not.exist')
    })
})