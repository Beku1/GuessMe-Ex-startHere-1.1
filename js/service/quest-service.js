var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
  if(!loadFromStorage('quests')){
  gQuestsTree = createQuest('Male?');
  gQuestsTree.yes = createQuest('Gandhi');
  gQuestsTree.no = createQuest('Rita');
  }
  else gQuestsTree = loadFromStorage('quests')
    
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function restartGame(){
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  var newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gCurrQuest;
  gPrevQuest[lastRes] = newQuest;
  gCurrQuest = gQuestsTree;
  saveToStorage('quests', gQuestsTree);
}

function getCurrQuest() {
  return gCurrQuest;
}
