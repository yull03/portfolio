import { GiSecretBook, GiTalk } from "react-icons/gi";
import { PiMedalBold } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";

const About = () => {
  const items = [
    { icon: <GiSecretBook />, text: "배움을 통한 자기 성장의 즐거움을 만끽하자!" },
    { icon: <GiTalk />,       text: "커뮤니케이션을 통해 긍정적 영향을 극대화" },
    { icon: <PiMedalBold />,  text: "성취감을 위한 도전은 두렵지 않다!" },
    { icon: <SlEnergy />,     text: "끈기있게 끝까지 절대 포기하지 않아!" },
  ];

  return (
    <div>
      <h1>About Me</h1>
      <div>
        <div className="back-img">
          <div className="text-list">
            {items.map((it, i) => (
              <ul key={i} className="about-row">
                <p className="about-icon">{it.icon}</p>
                <li>{it.text}</li>
              </ul>
            ))}
          </div>

          <div className="skill">
            <h3>My-skill</h3>
            <div className="skill-img">
              <img/>
              <img/>
              <img/>
              <img/>
              <img/>
              <img/>
              <img/>
              <img/>
              <img/>
              <img/>
              <div className="center-sass"><img className="sass" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;