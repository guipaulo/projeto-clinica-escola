import * as bcrypt from 'bcrypt';

async function gerarHashes() {
  console.log('123456 :', await bcrypt.hash('123456', 10));
  console.log('abcdef :', await bcrypt.hash('abcdef', 10));
  console.log('inativa:', await bcrypt.hash('inativa', 10));
}

gerarHashes();