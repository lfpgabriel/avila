//Salva empreendimento selecionado
function salvaEmp(proposta){
var ss = SpreadsheetApp.openByUrl(url);
var ws = ss.getSheetByName("Simulador");
var row = proposta.row;
ws.getRange(row,1).setValue(row);
ws.getRange(row,2).setValue(proposta.emp);
}



//Salva proposta selecionada
function salvaProposta(proposta){
      var ss = SpreadsheetApp.openByUrl(url);
      var ws = ss.getSheetByName("Simulador");
      var row = proposta.row;
      ws.getRange(row,1).setValue(row);
      ws.getRange(row,2).setValue(proposta.emp);
      ws.getRange(row,3).setValue(proposta.qua);
      ws.getRange(row,4).setValue(proposta.lot);
      ws.getRange(row,5).setValue(proposta.ivalvista);
      ws.getRange(row,6).setValue(proposta.ivalent);
      ws.getRange(row,7).setValue(proposta.iqtdpar);
      ws.getRange(row,8).setValue(proposta.ivalpar);
      ws.getRange(row,9).setValue(proposta.itipoproposta);
}


