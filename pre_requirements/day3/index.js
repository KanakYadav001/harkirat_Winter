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
    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log('File content:', data);

    })

}