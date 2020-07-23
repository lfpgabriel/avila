//PEGAR ULTIMA LINHA DE UMA COLUNA ESPECIFICA
function getLastRowSpecial(range){
  var rowNum = 0;
  var blank = false;
  for(var row = 0; row < range.length; row++){
    if(range[row][0] === "" && !blank){
      rowNum = row;
      blank = true;
    }else if(range[row][0] !== ""){
      blank = false;
    };
  };
  return rowNum;
};

//INCLUIR PÁGINA E PASTAS DE JS E CSS
function include(filename){
return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// não esta sendo utilizada
function render(file,argsObject){
  
  var tmp = HtmlService.createTemplateFromFile(file);
  if(argsObject){
    var keys = Object.keys(argsObject);
  
    keys.forEach(function(key){
    tmp[key] = argsObject[key];
    });
  }//Final do If
  return tmp.evaluate();
}