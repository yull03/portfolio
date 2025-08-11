

const Header = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header">
      <ul className="menu">
        <li onClick={() => scrollToSection("about")}>
          <span className="mask">About me</span>
        </li>
        <li onClick={() => scrollToSection("project")}>
          <span className="mask">Project</span>
        </li>
        <li onClick={() => scrollToSection("clone")}>
          <span className="mask">Clone</span>
        </li>
        <li onClick={() => scrollToSection("publishing")}>
          <span className="mask">Publishing</span>
        </li>
        <div className="line" aria-hidden="true" />
      </ul>
    </div>
  );
};

export default Header;