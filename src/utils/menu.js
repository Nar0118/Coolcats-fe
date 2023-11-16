const dirTree = require('directory-tree');
const fs = require('fs');
const filteredTree = dirTree(__dirname + '/../content', {attributes:["size", "type", "extension", 'mtime']});

let menu = [];
function iterate(obj, path = []) {
  for (var index in obj) {
    if (obj.hasOwnProperty(index)) {
      if (obj[index].type === 'file') {
        if (obj[index].path) {
          const relPath = obj[index].path.split('content')[1];
          const url = relPath.substring(0, relPath.length - obj[index].extension.length);
          const title = fs.readFileSync(obj[index].path);
          menu.push({
            to: url,
            text: title.toString().split('\n')[0].substring(2),
            description: title.toString().split('\n')[1],
            content: title.toString()
          });
        }
      } else if (obj[index].type === 'directory') {
        if (obj[index].children) {
          let curpath = [...path, index];
          iterate(obj[index].children, curpath);
        }
      }
    }
  }
}

iterate(filteredTree.children);

fs.writeFileSync(__dirname + '/../menu.json', JSON.stringify(menu));