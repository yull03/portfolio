

const Project = () => {
    return (
        <section id="list-wrap">
            <div className="left">
            <h1 className="list-main">
                My Work <br/><span className="and">and<br/></span> <span className="last-text">Project</span>
            </h1>

            <ul className="project-list">
                <li>
                    <h2>굿즈 쇼핑몰 - 팀프로젝트</h2>
                    <p>굿즈 쇼핑몰 사용자 경험에 있어 편리함을 제공하기 위함을 목적으로 제작하였습니다.</p>
                </li>
                <li>
                    <h2>주차관리 홍보형 웹사이트 - 팀프로젝트</h2>
                    <p>실시간 예약, 주차공간 공유, 빈자리 확인, CCTV 안전 확인 기능 홍보 프로젝트입니다.</p>
                </li>
                <li>
                    <h2>끝말잇기 게임 - Hello ‘IAM’ 말잇쥬</h2>
                    <p>오픈 API를 사용하여 데이터를 가공해 제작된 간단한 끝말잇기 게임입니다.</p>
                </li>
                <li>
                    <h2>객관식 퀴즈 웹 - 웹디자인 개발 기능사 퀴즈</h2>
                    <p>JSON 파일을 연동하여 카테고리별 정보를 제공하는 퀴즈입니다.</p>
                </li>
            </ul>
            </div>
            <div className="right">
            <img/>
            </div>
        </section>
    );
};

export default Project;