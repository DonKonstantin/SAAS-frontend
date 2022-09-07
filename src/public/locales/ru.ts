import CommonBucket from './CommonBucket.json';
import ObjectsPassportList from './ObjectsPassportList.json';
import validators from './validators.json';

const RU = {
  ...CommonBucket,
  ...ObjectsPassportList,
  ...validators,
};

export default RU;