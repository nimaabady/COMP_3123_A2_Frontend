export default function NavBar() {
  return (
    <nav className="navbar">
      <h2>My Website</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </nav>
  );
}