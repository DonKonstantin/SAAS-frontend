import CommonBucket from './CommonBucket.json';
import ObjectsPassportList from './ObjectsPassportList.json';
import playerList from './playerList.json';
import validators from './validators.json';

const RU = {
  ...CommonBucket,
  ...ObjectsPassportList,
  ...playerList,
  ...validators,
};

export default RU;