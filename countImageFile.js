var glob = require('glob');
var fs = require('fs');
var naturalSort = require('javascript-natural-sort');
var Path = require('path');

//var repos = ['jiangkangyur', 'degekangyur', 'degetengyur', 'mipam', 'gorampa', 'gampopa', '8thkarmapa', 'tsongkhapa'];
var repos = ['gampopa'];
var allImages = repos.map(countRepoImage);
showRepoImage(allImages);

function showRepoImage(allImages) {
  var text = [], appendix = [];

  allImages.forEach(function(repo) {
    var folders = repo.folders;

    text.push(repo.repoName);
    text.push('  總計 ' + repo.folderN + ' 資料夾，' + repo.totalImageN + ' 個圖檔。');

    appendix.push(repoName + '圖檔明細');
    folders.forEach(function (folder) {
      for (var folderName in folder) {
        var imageN = String(folder[folderName]);
        appendix.push('  ' + folderName + ' 資料夾，總計 '+ imageN + ' 個圖檔');
      }
    });
  });

  fs.writeFileSync('./result.txt', text.join('\n'), 'utf8');
}

function countRepoImage(repo) {
  var result = {repoName: repo, folderN: 0};
  var folders = {};

  var routes = glob.sync('../../totalImages/' + repo + '/' + repo + '*/*.jpg')
    .sort(naturalSort);

  result.totalImageN = routes.length;

  routes.forEach(function(route) {
    var folderName = /\/([^/]+?)$/.exec(Path.dirname(route))[1];
    if (! folders[folderName]) {
      folders[folderName] = 1;
      result.folderN++;
    }
    else {
      folders[folderName]++;
    }
  });

  result.folders = folders;

  return result;
}