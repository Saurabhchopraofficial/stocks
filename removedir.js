var fs = require('fs');
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
}
}
var deleteFile= function(path){
try {
    if( fs.existsSync(path) ) {
  fs.unlinkSync(path)
  //file removed
    }
} catch(err) {
  console.error(err)
}

};
deleteFolderRecursive("mochawesome-report");
deleteFile("mochawesome.json")
