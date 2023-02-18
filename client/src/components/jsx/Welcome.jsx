import '../css/Welcome.css';

function Welcome () {
  return (
    <div calss="Welcome-page">
        <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="150" height="120" class="d-inline-block align-text-top" />
        <h1 class="Welcome-header">Welcome to Rome</h1>
        <div class="Welcome-buttons">
            <a href="/login">
                <button type="button" class="btn btn-secondary">Login</button>
            </a>
            <a href="/signup">
                <button type="button" class="btn btn-secondary">Signup</button>
            </a>
        </div>
    </div>
  );
}

export default Welcome;
