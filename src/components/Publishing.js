
const Publishing = () => {
    return (
        <section id="card-main">
            <section id="publishing">
            <h1>Publishing</h1>
            </section>
            <div id="card-wrap">
                <div className="item-title"><h2>BLOG</h2></div>
                <div className="item-card">
                    <a href="https://yull03.github.io/logger/index.html" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/blog.png`}/></a>
                </div>
                <div className="item-title"><h2>Pinterest</h2></div>
                <div className="item-card">
                    <a href="https://yull03.github.io/pinterest/images.html" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/pinterest.png`}/></a>
                </div>
                <div className="item-title"><h2>Yes&#8209;24</h2></div>
                <div className="item-card">
                    <a href="https://yull03.github.io/bookstore/index-2.html" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/yes24.png`}/></a>
                </div>
                <div className="item-title"><h2>Trabel</h2></div>
                <div className="item-card">
                    <a href="https://yull03.github.io/0530/index.html" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/trable.png`}/></a>
                </div>
            </div>
        </section>
    );
};

export default Publishing;