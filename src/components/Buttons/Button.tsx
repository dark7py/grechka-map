import s from './Button.module.scss';

type TProps = {
  text: string;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  className?: string;
};

export const Button = ({text, handleClick}: TProps) => {
  return (
    <button className={s.button} onClick={handleClick}>
      {text}
    </button>
  )
}