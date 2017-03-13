var glob = require('glob');
var fs = require('fs');
var naturalSort = require('javascript-natural-sort');
var Path = require('path');

var repos = ['jiangkangyur', 'degekangyur', 'degetengyur', 'mipam', 'gorampa', 'gampopa', '8thkarmapa', 'tsongkhapa'];
var repoImages = repos.map(countRepoImage);
showRepoImage(repoImages);

function showRepoImage(repoImages) {
  fs.writeFileSync('./result.txt', JSON.stringify(repoImages, null, '  '), 'utf8');
}

function countRepoImage(repo) {
  var result = {repoName: repo, folderN: 0};

  var routes = glob.sync('../../totalImages/' + repo + '/' + repo + '*/*.jpg')
    .sort(naturalSort);

  result.totalImageN = routes.length;

  routes.forEach(function(route) {
    var folder = /\/([^/]+?)$/.exec(Path.dirname(route))[1];
    if (! result[folder]) {
      result[folder] = 1;
      result.folderN++;
    }
    else {
      result[folder]++;
    }
  });
  return result;
}