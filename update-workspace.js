const { readdir, readFile, writeFile } = require('fs/promises');
const fs = require('fs');

const tsconfig = require('./tsconfig.json');

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const updateTSreferences = async () => {
  const dirs = await getDirectories('./aulas');
  tsconfig.references = dirs.map((item) => {
    if(fs.existsSync(`./aulas/${item}/tsconfig.json`)) {
      return {
       "path": `./aulas/${item}`
      }
    }
  })

  try {
    await writeFile('tsconfig.json', JSON.stringify(tsconfig, null, 2), 'utf8');
    console.info('Updated file!')
  } catch(e) {
    console.info('Error updating file.')
  }
}

const read = async (file) => {
  try {
    return await readFile(file, 'utf8')
  } catch (e) {
    return false
  }
}

const updatePackageNames = async () => {
  const dirs = await getDirectories('./aulas');
  dirs.forEach(async (item) => {
    const pathFile = `./aulas/${item}/package.json`;
    const package = JSON.parse(await read(pathFile));
    if(package) {
      package.name = item
      console.info(pathFile)
      await writeFile(pathFile, JSON.stringify(package, null, 2), 'utf8');
    }
  })
}

const update = async () => {
  await updateTSreferences();
  await updatePackageNames();
}

update();