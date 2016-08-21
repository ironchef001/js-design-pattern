var fs=require('fs');
var readline = require('readline2');
var Stream = require('stream');

String.prototype.reverse=function(){return this.split("").reverse().join("");}

function readFileByLine(inputFile, outputFile) {
   var instream = fs.createReadStream(inputFile);
   var outstream = new Stream();
   outstream.readable = true;
   outstream.writable = true;

   var rl = readline.createInterface({
      input: instream,
      output: outstream,
      terminal: false
   });

   rl.on('line', function (line) {
        fs.appendFileSync(outputFile, line.reverse() +'\n');
   });
};

var inputFileName='testdata/testdata-1.txt';
var outFileName=inputFileName+'.en2.txt';

readFileByLine(inputFileName, outFileName);