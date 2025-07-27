import Image from 'next/image';
import PropTypes from 'prop-types';

export default function DeleteButton({ onClick, title = 'Eliminar' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="delete-button"
      title={title}
      aria-label={title}
    >
      <Image src="/icons/delete.svg" alt="Eliminar" width={20} height={20} />
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};
