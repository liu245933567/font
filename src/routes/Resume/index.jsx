import React from "react";
import resumeData from "./resume.json";

const BasicInfo = ({ basicinfo }) => {
  return (
    <section className="basicinfo">
      <div className="text-info name">{basicinfo.name}</div>
      <div className="text-info description">{basicinfo.description}</div>
      <div className="text-info">
        <i className="fa fa-university"></i>
        {basicinfo.school}·{basicinfo.profession}
      </div>
      <div className="text-info">
        <i className="fa fa-user"></i>
        {basicinfo.sex}·{basicinfo.education}·{basicinfo.workage}
      </div>
      <div className="phone text-info inline-block">
        {!basicinfo.phone ? (
          ""
        ) : (
          <div>
            <i className="fa fa-phone"></i>
            <a href={"tel:" + basicinfo.phone}>{basicinfo.phone}</a>
          </div>
        )}
      </div>
      <div className="email text-info inline-block">
        {!basicinfo.email ? (
          ""
        ) : (
          <div>
            <i className="fa fa-envelope-o"></i>
            <a href={"mailto:" + basicinfo.email}>{basicinfo.email}</a>
          </div>
        )}
      </div>
    </section>
  );
};

const Social = ({ social }) => (
  <section className="social">
    {social.map(function (item) {
      //如果有icon 优先使用icon
      if (!item.icon) {
        return (
          <a
            className={"fa fa-" + item.type}
            href={item.link}
            key={item.type + item.link}
          ></a>
        );
      }
      return (
        <a href={item.link} key={item.type + item.link}>
          <img src={item.icon} />
        </a>
      );
    })}
  </section>
);

const ExperienceList = ({ type, experiences }) => (
  <section className="experiencelist">
    <div className="experience-type">{type}</div>
    {experiences.map(function (experience) {
      return <Experience experience={experience} key={experience.name} />;
    })}
  </section>
);

const Experience = ({ experience }) => (
  <section className="experience">
    <div className="clearfix item">
      {(function (icon) {
        if (icon && icon != "") {
          return (
            <div className="icon fl">
              <img src={icon} />
            </div>
          );
        }
      })(experience.icon)}

      <div className="fl name-title">
        <div className="name">
          {!experience.name_link ? (
            <a>{experience.name}</a>
          ) : (
            <a href={experience.name_link}>{experience.name}</a>
          )}
          {!experience.name_link ? "" : <i className="fa fa-link"></i>}
        </div>
        <div className="title">{experience.title}</div>
      </div>
      <div className="fr time-location">
        <div className="time">{experience.time}</div>
        <div className="location">
          {!experience.location ? (
            ""
          ) : (
            <div>
              <i className="fa fa-map-marker"></i>
              {experience.location}
            </div>
          )}
        </div>
      </div>
    </div>
    {!experience.description ? (
      ""
    ) : (
      <div className="description">{experience.description}</div>
    )}
  </section>
);

const Resume = () => {
  const resume = resumeData;
  const header_style = {
    backgroundImage: resume.background_image
      ? "url(link)".replace("link", resume.background_image)
      : "",
  };

  return (
    <div id="">
      <div className="resume-container animated fadeInUp">
        <header style={header_style}>
          <img className="avatar" src={resume.avatar} />
        </header>
        <BasicInfo basicinfo={resume.basicinfo} />
        <Social social={resume.social} />
        <ExperienceList type="获奖经历" experiences={resume.Awards} />
        <ExperienceList
          type="社团/组织"
          experiences={resume.socialExperiences}
        />
        <ExperienceList
          type="实习经历"
          experiences={resume.InternExperiences}
        />
        <ExperienceList
          type="项目经验"
          experiences={resume.ProjectExperience}
        />
      </div>
    </div>
  );
};

export default Resume;
