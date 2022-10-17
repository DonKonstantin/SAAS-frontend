import entityList from './entity-list.json';
import ObjectsPassportList from './ObjectsPassportList.json';
import validators from './validators.json';
import playerList from './playerList.json';
import UI from './UI.json';
import pages from './pages.json';
import entityEdit from './entity-edit.json';
import playerCodes from './player-codes.json';

const RU = {
  ...entityList,
  ...ObjectsPassportList,
  ...validators,
  ...playerList,
  ...UI,
  ...pages,
  ...entityEdit,
  ...playerCodes,
};

export default RU;