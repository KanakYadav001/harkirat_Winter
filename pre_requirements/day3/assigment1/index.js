import { Command} from 'commander';
import fs from 'fs';
import path from 'path';
const program = new Command();

 program.option('-f, --file <path>', 'path to the input file')
 .action((options) => {
    readFile(options.file);
  });


  program.parse(process.argv);






  function readFile(filePath) {
    const absolutePath = path.resolve(filePath);
   const content =  fs.readFileSync(absolutePath , 'utf8')
    
   const totalWords = content.split(/\s+/).length;

   console.log(`Total words in the file: ${totalWords}`);

}