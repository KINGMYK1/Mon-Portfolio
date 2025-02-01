import { NavLink as BaseNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({ to, children }) => {
  return (
    <BaseNavLink
      to={to}
      className={({ isActive }) => 
        isActive ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'
      }
    >
      {children}
    </BaseNavLink>
  );
};
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default NavLink;