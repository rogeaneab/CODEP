import { createHashRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Courses } from "./components/Courses";
import { CourseDetail } from "./components/CourseDetail";
import { Lesson } from "./components/Lesson";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { Quizzes } from "./components/Quizzes";
import { QuizGame } from "./components/QuizGame";
import { LandingPage } from "./components/LandingPage";
import { Challenges } from "./components/Challenges";
import { Certificates } from "./components/Certificates";
import { Trails } from "./components/Trails";

export const router = createHashRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/app",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "courses", Component: Courses },
      { path: "courses/:courseId", Component: CourseDetail },
      { path: "courses/:courseId/lessons/:lessonId", Component: Lesson },
      { path: "quizzes", Component: Quizzes },
      { path: "quizzes/:quizId", Component: QuizGame },
      { path: "trails", Component: Trails },
      { path: "challenges", Component: Challenges },
      { path: "certificates", Component: Certificates },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);
