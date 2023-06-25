import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import { useEffect, useState } from "react";

const Featured = ({ rev }) => {

  const [persentage, setpersentage] = useState();
  const [assign_target, setassign_target] = useState(0);


  useEffect(() => {



    if (assign_target == 0) {
      setpersentage(0)

    } else {

      setpersentage(rev[0] / assign_target * 100)

    }

  }, [rev, assign_target]);

  const handel_target = (e) => {


    setassign_target(e)
    const roundedNumber =Math.round(assign_target);
    console.log(roundedNumber)

  }



  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={persentage} text={persentage+"%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">{rev[0]} L.E</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult ">
              <div className="resultAmount"><input type="number" style={{width:"100px" , height:"35px" ,fontSize:"20px", border:"none"}} placeholder={assign_target} onChange={(e) => handel_target(e.target.value)} /></div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
              <div className="resultAmount">{rev[1]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
