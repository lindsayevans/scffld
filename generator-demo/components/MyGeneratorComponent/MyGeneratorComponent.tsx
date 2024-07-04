import React from 'react';
import cx from 'clsx';

import classes from './MyGeneratorComponent.module.scss';
const baseClass = 'myGeneratorComponent';

export type MyGeneratorComponentProps = {
  active?: boolean;
};

export const MyGeneratorComponent: React.FC<MyGeneratorComponentProps> = (
  props
) => {
  const { active } = props;

  return (
    <div
      className={cx(
        classes[baseClass],
        active && classes[`${baseClass}--active`]
      )}
    >
      <h3 className={classes[`${baseClass}__title`]}>
        Hello from My Generator Component!
      </h3>
    </div>
  );
};
