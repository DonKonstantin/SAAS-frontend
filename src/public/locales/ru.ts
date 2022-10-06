import CommonBucket from './CommonBucket.json';
import ObjectsPassportList from './ObjectsPassportList.json';
import validators from './validators.json';
import playerList from './playerList.json';

const RU = {
  ...CommonBucket,
  ...ObjectsPassportList,
  ...validators,
  ...playerList,
};

export default RU;