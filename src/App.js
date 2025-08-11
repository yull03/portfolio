import About from "./components/About";
import Clone from "./components/Clone";
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";
import Main from "./components/Main";
import Project from "./components/Project";
import Publishing from "./components/Publishing";


const App = () => {
  return (
    <div>
      <Main/>
      <Header/>
      <About/>
      <Project/>
      <List/>
      <Clone/>
      <Publishing/>
      <Footer/>
    </div>
  );
};

export default App;
