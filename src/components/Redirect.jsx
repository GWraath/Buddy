import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect({ to, when }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (when) {
      navigate(to);
    }
  }, [to, when, navigate]);

  return null;
}

export default Redirect;
