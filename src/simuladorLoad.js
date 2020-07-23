//Home 
function loadForm(){
  return criaProposta();
}

//CRIA PROPOSTA EM UMA LINHA DA PLANILHA
function criaProposta(){
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Simulador");
  var col = ws.getRange("A:A").getValues();
  var row = getLastRowSpecial(col)+1;
  ws.getRange(row,1).setValue(row);
  return getEmpQuaLotRow(row); 
}

//EMPREENDIMENTOS QUADRAS E LOTES SELECIONÁVEIS + LINHA DA PROPOSTA
function getEmpQuaLotRow(row){
//var ss = SpreadsheetApp.openByUrl(url);
//var we = ss.getSheetByName("Empreendimentos");
//var listemp = we.getRange(1,1,we.getRange("A1").getDataRegion().getLastRow(),1).getValues();
//var listqua = we.getRange(1,1,we.getRange("A1").getDataRegion().getLastRow(),2).getValues();
//var listlot = we.getRange(1,1,we.getRange("A1").getDataRegion().getLastRow(),3).getValues();
//var tmp = HtmlService.createTemplateFromFile("Simulador");
//tmp.listemp = listemp.map(function(r){ return r[0]; });
//tmp.listqua = [];//listqua.map(function(r){ return r[1]; });
//tmp.listlot = [];//listlot.map(function(r){ return r[2]; });
//tmp.row = row;
//return tmp.evaluate(); 
  return makeDropDown();
}





//function getQuas(empz){
//  var ss = SpreadsheetApp.openByUrl(url);
//  var ws = ss.getSheetByName("Lotes");
//  var valsz = {};
//  valsz.row = row;
//  valsz.listofquas = "";  
//  return valsz;
//}

//function getCosts(row){
//  var ss = SpreadsheetApp.openByUrl(url);
//  var ws = ss.getSheetByName("Simulador"); 
//  var vals = {};
//  var vals = {};
//  vals.row = row;
//  vals.valprazo = ws.getRange(row,12).getValue();
//  vals.valvista = ws.getRange(row,13).getValue();
//  vals.valent = ws.getRange(row,14).getValue();
//  vals.valpar = ws.getRange(row, 26).getValue(); 
//  vals.valvistac = ws.getRange(row,5).getValue();
//  vals.valentc = ws.getRange(row,6).getValue();
//  vals.saldofinc = ws.getRange(row,15).getValue();
//  vals.jac = ws.getRange(row,29).getValue();
//  vals.jmc = ws.getRange(row,30).getValue();
//  vals.valparc = ws.getRange(row,27).getValue();
//  vals.qtdparc = ws.getRange(row,28).getValue();
////  //vals.totalp = ws.getRange(row,31).getValue();
  
 // return vals;
//}





//fazer dropdowns relacionados
function makeDropDown(data,filtersAsArray,targetElement){
  //filtro a partir de Level 1 selecionado
  const filteredArray = filterArray(data,filtersAsArray);
  //pega os valores unicos da array e o seu numero total
  const uniqueList = getUniqueValues(filteredArray,filtersAsArray.length);
  //chama a função para povoar o dropdowns informando o dropdpwnn a ser povoado e a lista para povoar
  populateDropDown(targetElement,uniqueList);
}

//aplica dropdown a página
function applyDropDown(){
  //seleciona o elemento a ser alterado 
  const selectLevel1Value = document.getElementById("Level1").value;
  //pegando o elemento Level 2 da página html
  const selectLevel2 = document.getElementById("Level2");
  //chama a função makedropdown para o elemento selecionado
  makeDropDown(myData,[selectLevel1Value],selectLevel2);
  applyDropDown2();
}

//aplica dropdown a página
function applyDropDown2(){
  //seleciona o elemento a ser alterado 
  const selectLevel1Value = document.getElementById("Level1").value;
  //seleciona o elemento a ser alterado 
  const selectLevel2Value = document.getElementById("Level2").value;
  //pegando o elemento Level 2 da página html
  const selectLevel3 = document.getElementById("Level3");
  //chama a função makedropdown para o elemento selecionado
  makeDropDown(myData,[selectLevel1Value,selectLevel2Value],selectLevel3);
}

//funções executadas quando a página carrega
function afterDocumentLoads(){
  //povoar primeiro dropdown
  populateFirstLevelDropDown();
  //aplicar dropdowns à página
  applyDropDown();
}

//filtra valores unicos
function getUniqueValues(data,index){
  //Filtro de valores unicos(set) de filtered array
  const uniqueOptions = new Set();
  //para cada valor unico de unique options adicionar uma opção dele sendo a próxima coluna
  data.forEach(r =>uniqueOptions.add(r[index]));
  //descontrução de unicos valores com valores filtrados
  return [...uniqueOptions];
}

//povoar primeiro dropdown
function populateFirstLevelDropDown(){
  //pegar apenas valors unicos para povoar o dropdown
  const uniqueList = getUniqueValues(myData,0);
  //selecionar primeiro dropdown para que ele seja povoado
  const el = document.getElementById("Level1");
  //chamar a função para povoar dropdown
  populateDropDown(el,uniqueList);
}

//povoar dropdowns
function populateDropDown(el,listAsArray){
  //zerar os valores do level 2 para depois povoa-lo
  el.innerHTML = "";
  //criando opções no html para cada um dos item das lista
  listAsArray.forEach(item => {
      //criando opção
      const option = document.createElement("option");
      //passando valor para opção
      option.textContent = item;
      //adicionando option ao level 2
      el.appendChild(option);
  });
}

//filtrar array
function filterArray(data, filtersAsArray){
  //para cada item selecionado retornar valores filtrados correspondentes a ele
  return data.filter(r => filtersAsArray.every((item,i) => item === r[i]));
}

//eventos da pagina que chamam funções
document.getElementById("Level1").addEventListener("change",applyDropDown);
document.getElementById("Level2").addEventListener("change",applyDropDown2);
document.addEventListener("DOMContentLoaded",afterDocumentLoads);