import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Button variant="outlined" onClick={goBack}>
      Go back
    </Button>
  );
};

export default GoBackButton;
