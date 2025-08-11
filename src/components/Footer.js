
const Footer = () => {
    return (
        <footer className="footer">
            <h1 className="footer-title">Other Goals</h1>

            <div className="footer-content">
                <span className="content">Back-end</span>
                <span className="content">Vue</span>
                <span className="content">Linux</span>
                <span className="content">full-stack developer</span>
                <span className="content">TypeScript</span>
                <span className="content">Obtain</span>
            </div>

            <section className="info">
                <div className="footer-item">
                    <p className="footer-label">연락처</p> 010-4721-6271
                </div>
                <div className="footer-item">
                    <p className="footer-label">이메일</p> yull03@naver.com
                </div>
                <div className="footer-item">
                    <p className="footer-label">깃허브</p>
                    <a href="https://github.com/yull03">https://github.com/yull03</a>
                </div>
            </section>
        </footer>
    );
};

export default Footer;