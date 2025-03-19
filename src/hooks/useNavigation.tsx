
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      // Si on n'est pas sur la page d'accueil, naviguer d'abord vers celle-ci
      if (location.pathname !== '/') {
        navigate('/');
        // Slight delay to ensure navigation completes before scrolling
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      } else {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      return true; // Indicates navigation was handled
    } else {
      navigate(href);
      return true; // Indicates navigation was handled
    }
  };

  const scrollToAppointment = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Slight delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById('appointment');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById('appointment');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    return true; // Indicates navigation was handled
  };

  return {
    handleNavigation,
    scrollToAppointment
  };
};
