import './errorComponent.css';

function ErrorComponent () {
  return (
    <div className={'error-outer'}>
      <div className={'error-inner'}>
        <h2>An error has occurred.</h2>
        <p>Please try again!</p>
      </div>
    </div>
  );
}

export default ErrorComponent;