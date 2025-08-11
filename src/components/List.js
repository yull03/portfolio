
const List = () => {
    return (
        <section id="pro-text">
            <div className="left-list">
            <h1 className="pro-title">Project <br/><span>List</span></h1>

            <ul className="pro-sub">
                <li className="text-one">Goods-Mall</li>
                <li className="text-two">Parking</li>
                <li className="text-three">Word-Game</li>
                <li className="text-four">Quiz-Game</li>
            </ul>
            </div>

            <div className="image-list">
                <button>↑</button>
                <p>Prev</p>
                <div className="image-hidden">
                <img/>
                <img/>
                </div>
                <p>Next </p>
                <button>↓</button>
            </div>
        </section>
    );
};

export default List;