import About from "./About";
import Clone from "./Clone";
import Header from "./Header";
import List from "./List";
import Project from "./Project";
import Publishing from "./Publishing";

const Main = () => {
    return (
        <div id="all-style">
            <div className="top">
            <div className="image">
                <img/>
            </div>
            <div className="main-text">
                <p className="one">Front</p>
                <p className="two">End</p>
                <p className="three">PORTFOLIO</p>
            </div>
            </div>
            <Header/>
            <div className="main-bottom">
                <div className="img-box">
                    <img/>
                    <div className="box-text">
                    <ul>
                        <h2>Phone</h2>
                        <li>010-4721-6271</li>
                    </ul>
                    <ul>
                        <h2>E-mail</h2>
                        <li>yull03@naver.com</li>
                    </ul>
                    </div>
                </div>
                <div className="bottom-text">
                    <ul className="my-text">
                        <h1>Kim-Yull</h1>
                        <li>협업과 성장을 즐기는 프론트앤드 개발자</li>
                    </ul>
                    <ul className="git">
                        <h3>Git-hub :</h3>
                        <li><a href="https://github.com/yull03">https://github.com/yull03</a></li>
                    </ul>

                </div>
            </div>
            <About/>
            <Project/>
            <List/>
            <Clone/>
            <Publishing/>
        </div>
    );
};

export default Main;