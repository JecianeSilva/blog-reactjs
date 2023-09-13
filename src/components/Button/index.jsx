import './styles.css';

export const Button = ({ text, onClick, disabled }) => (
  <button 
    className='btn-loadMore' 
    onClick={() => onClick()}
    disabled={disabled}
  >
    {text}
  </button>
);