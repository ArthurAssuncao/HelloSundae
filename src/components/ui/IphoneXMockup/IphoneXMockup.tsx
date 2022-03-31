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
        <i className={style.speaker}>Speaker</i>
        <b className={style.camera}>Camera</b>
      </div>
      {children}
    </div>
  );
};

export { IphoneXMockup };
