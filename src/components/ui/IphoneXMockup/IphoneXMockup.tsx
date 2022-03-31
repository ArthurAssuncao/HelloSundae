import classNames from 'classnames';
import style from './IphoneXMockup.module.scss';

interface IphoneXMockupProps {
  className?: string;
  children?: React.ReactNode;
}

const IphoneXMockup = (props: IphoneXMockupProps): JSX.Element => {
  const { className, children } = props;
  return (
    <div className={classNames(style.iphoneX, className)}>
      <div className={style.deviceTop}>
        <span className={style.speaker}></span>
        <span className={style.camera}></span>
      </div>
      {children}
    </div>
  );
};

export { IphoneXMockup };
