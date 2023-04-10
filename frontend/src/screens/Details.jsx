import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Avatar from "react-avatar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactMarkup from "react-markdown";
import axios from "axios";
import { GetFormlocalStorage } from "../utils/LocalStorage";

const Details = () => {
  const paran = useParams();
  const [error, setError] = useState();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!GetFormlocalStorage("userInfo")) return navigate("/login");
  }, [navigate]);

  const getDiary = async (_id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/diaries/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${GetFormlocalStorage("userInfo")?.token}`,
          },
        }
      );
      console.log(data);
      setEvent(data);
    } catch (error) {
      setError(error?.response?.data?.error);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const deleteDiary = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/api/diaries/${_id}`, {
        headers: {
          Authorization: `Bearer ${GetFormlocalStorage("userInfo")?.token}`,
        },
      });

      return getDiaries();
    } catch (error) {
      setError(error?.response?.data?.error);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (paran.id) getDiary(paran.id);
  }, [paran.id]);
  const handleDelete = (id) => deleteDiary(id);

  return (
    <div className="col-lg-8 col-md-10 col-12 mx-auto">
      {error && (
        <div className="alert alert-danger text-center mb-3">{error}</div>
      )}
      <div className="card border-0 shadow-sm p-3">
        <div className="card-body">
          <div className="card-img-top text-center title">
            <div className="display-1">
              {moment(event?.eventDate).format("DD")}
            </div>
            <div>{moment(event?.eventDate).format("MMMM YYYY, h:MM:SS")}</div>
          </div>
          <hr />
          <h2 className="card-title font-monspace fs-5 fw-bold">
            {event?.title}
          </h2>
          <div className="card-text">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Avatar
                  name={event?.user?.name}
                  size="20"
                  textSizeRatio={1.75}
                  round="25px"
                />
                <small className="ms-2">{event?.user?.name}</small>
              </div>
              <div>
                <Link to={`/diary/form/${event?._id}`}>
                  <FaEdit />
                </Link>
                <FaTrashAlt
                  className="ms-2 text-danger cursor  "
                  onClick={() => handleDelete(event?._id)}
                />
              </div>
            </div>
            <ReactMarkup children={`${event?.description}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
