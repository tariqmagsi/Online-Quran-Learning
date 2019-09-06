import React, { Component } from "react";
import "./App.css";
import "./components/Menu";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Dashboard from "./components/PortalComponents/Dashboard";
import Info from "./components/PortalComponents/Info";
import Online from "./components/Online";
import ChangePassword from "./components/PortalComponents/ChangePassword";
import EnrollCourses from "./components/PortalComponents/EnrollCourses";
import Books from "./components/PortalComponents/Books";
import Book from "./components/PortalComponents/Book";
import LiveLectures from "./components/PortalComponents/LiveLectures";
import LiveLecture from "./components/PortalComponents/LiveLecture";
import Announcement from "./components/PortalComponents/Announcement";
import Edit from "./components/PortalComponents/EditProfile";
import TeachersList from "./components/PortalComponents/StudentsList";
import TDashboard from "./components/TeacherComponents/Dashboard";
import TInfo from "./components/TeacherComponents/Info";
import TChangePassword from "./components/TeacherComponents/ChangePassword";
import TEnrollCourses from "./components/TeacherComponents/EnrollCourses";
import TBooks from "./components/TeacherComponents/Books";
import TBook from "./components/TeacherComponents/Book";
import TLiveLectures from "./components/TeacherComponents/LiveLectures";
import TLiveLecture from "./components/TeacherComponents/LiveLecture";
import TAnnouncement from "./components/TeacherComponents/Announcement";
import StudentsList from "./components/TeacherComponents/StudentsList";
import TEdit from "./components/TeacherComponents/EditProfile";
import AdminDashboard from "./components/AdminComponents/Dashboard";
import AdminInfo from "./components/AdminComponents/Info";
import AdminChangePassword from "./components/AdminComponents/ChangePassword";
import AdminCourses from "./components/AdminComponents/EnrollCourses";
import Enrollments from "./components/AdminComponents/Students";
import AdminEdit from "./components/AdminComponents/EditProfile";
import Messages from "./components/AdminComponents/Messages";
import ResetPassword from "./components/ChangePassword";
import StudentsAndTeachers from "./components/AdminComponents/StudentsAndTeachers";

class App extends Component {
  render() {
    if (this.props.Loading) {
      return <h1>Loading</h1>;
    }

    const ComponentToHide = props => {
      const { location } = props;
      if (location.pathname.match("/Login")) {
        return null;
      } else if (location.pathname.match("/Dashboard")) {
        return <Dashboard />;
      } else if (location.pathname.match("/ProfileInfo")) {
        return <Info />;
      } else if (location.pathname.match("/ChangePassword")) {
        return <ChangePassword />;
      } else if (location.pathname.match("/EnrollCourses")) {
        return <EnrollCourses />;
      } else if (location.pathname.match("/Books")) {
        return <Books />;
      } else if (location.pathname.match("/Book")) {
        return <Book />;
      } else if (location.pathname.match("/LiveLectures")) {
        return <LiveLectures />;
      } else if (location.pathname.match("/LiveLecture")) {
        return <LiveLecture />;
      } else if (location.pathname.match("/Announcement")) {
        return <Announcement />;
      } else if (location.pathname.match("/EditProfile")) {
        return <Edit />;
      } else if (location.pathname.match("/TeachersList")) {
        return <TeachersList />;
      } else if (location.pathname.match("/TeacherDashboard")) {
        return <TDashboard />;
      } else if (location.pathname.match("/TeacherProfileInfo")) {
        return <TInfo />;
      } else if (location.pathname.match("/TeacherChangePassword")) {
        return <TChangePassword />;
      } else if (location.pathname.match("/TeacherEnrollCourses")) {
        return <TEnrollCourses />;
      } else if (location.pathname.match("/TeacherBooks")) {
        return <TBooks />;
      } else if (location.pathname.match("/TeacherLiveLectures")) {
        return <TLiveLectures />;
      } else if (location.pathname.match("/TeacherLiveLecture")) {
        return <TLiveLecture />;
      } else if (location.pathname.match("/TeacherBook")) {
        return <TBook />;
      } else if (location.pathname.match("/TeacherAnnouncement")) {
        return <TAnnouncement />;
      } else if (location.pathname.match("/TeacherEditProfile")) {
        return <TEdit />;
      } else if (location.pathname.match("/StudentsList")) {
        return <StudentsList />;
      } else if (location.pathname.match("/AdminDashboard")) {
        return <AdminDashboard />;
      } else if (location.pathname.match("/AdminProfileInfo")) {
        return <AdminInfo />;
      } else if (location.pathname.match("/AdminChangePassword")) {
        return <AdminChangePassword />;
      } else if (location.pathname.match("/AdminCourses")) {
        return <AdminCourses />;
      } else if (location.pathname.match("/AdminEditProfile")) {
        return <AdminEdit />;
      } else if (location.pathname.match("/Enrollments")) {
        return <Enrollments />;
      } else if (location.pathname.match("/StudentsAndTeachers")) {
        return <StudentsAndTeachers />;
      } else if (location.pathname.match("/Messages")) {
        return <Messages />;
      } else if (location.pathname.match("/ResetPassword")) {
        return <ResetPassword />;
      } else {
        return <Online />;
      }
    };

    const ComponentThatHides = withRouter(ComponentToHide);

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/Login" component={Login} name="active" />
          </Switch>
          <ComponentThatHides />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
