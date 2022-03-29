import Alert from 'react-bootstrap/Alert';

interface AlertBannerProps {
  message: string;
  variant: string;
}

const AlertBanner = (props: AlertBannerProps): JSX.Element => {
  const { message, variant } = props;

  const alertMessage = message || 'An error occurred. Please try again later.';
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};

export { AlertBanner };
