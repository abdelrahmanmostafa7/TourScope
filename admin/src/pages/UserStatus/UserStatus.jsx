import "./UserStatus.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";
import useFetch from "../../hook/useFetch";

const Single = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="bottom">
        <h1 className="title">Employees</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
