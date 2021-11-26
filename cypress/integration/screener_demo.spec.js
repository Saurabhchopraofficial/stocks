import selectors from '../data/selectors'

let arrayStocks = ['Infosys Ltd', 'TCS', 'Reliance'];
let buyStocks = [];
let holdStocks = [];

arrayStocks.forEach(stock => {
  
  describe('Screener.in', () => {
    before(() => {
      cy.visit('https://www.screener.in/')
    })
    it('Compares CMP of ' + stock + ' with 52 week high' , () => {
      //Select the Stock
      cy.get(selectors.searchBox).type(stock)
      cy.get(selectors.selectStock).click()
      //Get 52 wk high
      cy.get(selectors.yearHigh).then(text => {
        var yearHigh = text.text().replace(",", "")
        //Get CMP
        cy.get(selectors.cmp).then(text => {
          var cmp = text.text().replace(",", "")
          //Compare CMP with 52 wk high
          if (cmp < 0.90 * yearHigh) {
            cy.log('Stock is 10% below its 52 week high')
            buyStocks.push(stock);
          } else {
            cy.log('No Buy signals yet')
            holdStocks.push(stock);
          }
        })
      })
    })  
  }) 
});

describe('Publish the results', () => {  
  
  it('Publishes stocks with a Buy signal', () => {
    cy.log(buyStocks)
    cy.writeFile('cypress/fixtures/buy.txt','Following stocks present a Buy Signal: '+ buyStocks)
  })
  it('Publishes stocks with no signal', () => {
    cy.log(holdStocks)
    cy.writeFile('cypress/fixtures/hold.txt','Following stocks do not have a Buy signal: '+ holdStocks)
  })

});

  xdescribe('Parametrization',() =>{
    it('Verify the CMPs of 3 companies',()=>{
      cy.fixture('example1.json').as("inputdata")
      cy.get("@inputdata").then((inputdata)=>{
        const input = inputdata.Company
        input.forEach(input1 => {
          cy.visit('https://www.screener.in/');
          cy.get(selectors.searchBox).type(input1);
          cy.get(selectors.selectStock).click();
          cy.get(selectors.cmp).then(text => {
            const text1 = text.text()
            cy.readFile('cypress/fixtures/CMP').as("CMP")
            cy.get("@CMP").then(CMP => {
              const text2 = CMP
              cy.writeFile('cypress/fixtures/CMP','CMP of '+input1+' is '+text1+'\n'+text2)
            })    
          })   
        })
      })
    })
  })