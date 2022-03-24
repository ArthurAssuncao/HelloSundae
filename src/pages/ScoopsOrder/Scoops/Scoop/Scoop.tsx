import 'dotenv/config';
import React from 'react';
import style from './Scoop.module.scss';

export interface Scoop {
  name: string;
  imagePath: string;
}

const ScoopComp = (props: Scoop): React.ReactElement => {
  const { name, imagePath } = props;
  return (
    <div className={style.container}>
      <span>{name}</span>
      <img
        src={`${process.env.SERVER_URL as string}${imagePath}`}
        alt={`${name} scoop`}
      />
    </div>
  );
};

export { ScoopComp };
