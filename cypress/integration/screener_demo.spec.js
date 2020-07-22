context('Screener.in', () => {
beforeEach(() => {
    cy.visit('https://www.screener.in/')
  })

  it('Verify the Search option in home page',() => {
      cy.get('input[placeholder= "eg. infosys"]').type('Infosys')
      cy.get('ul li:first').should('have.class','active').click()
      //cy.url().should('include','/INFY/')
      cy.title().should('include','Infosys Ltd')
  })
 it('Verify the CMP of Particular company',() =>{
    cy.get('input[placeholder= "eg. infosys"]').type('TCS')
    cy.get('ul li:first').should('have.class','active').click()
    cy.get('#content-area > section:nth-child(5) > ul > li:nth-child(2) > b').then(($text=>{
        const text1 = $text.text()
        cy.writeFile('cypress/fixtures/price.txt','CMP is '+text1)

    }))
   
 })
 
})
context('Parametrization',() =>{
it('Verify the CMPs of 3 companies',()=>{
  cy.fixture('example1.json').as("inputdata")
  cy.get("@inputdata").then((inputdata)=>{
    const input = inputdata.Company
    input.forEach(input1 => {
      cy.visit('https://www.screener.in/')
      cy.get('input[placeholder= "eg. infosys"]').type(input1)
      cy.get('ul li:first').should('have.class','active').click()
      cy.get('#content-area > section:nth-child(5) > ul > li:nth-child(2) > b').then(($text => {
        const text1 = $text.text()
        cy.readFile('cypress/fixtures/CMP').as("CMP")
        cy.get("@CMP").then(($CMP)=>{
        const text2 = $CMP
        cy.writeFile('cypress/fixtures/CMP','CMP of '+input1+' is '+text1+'\n'+text2)
          })    
        }))                
      })
    })
  })
})