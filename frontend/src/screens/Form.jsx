import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { GetFormlocalStorage } from "../utils/LocalStorage";
import moment from "moment";

const Form = () => {
  const paran = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [formStatus, setFormStatus] = useState();
  const [eventDate, seteventDates] = useState();
  useEffect(() => {
    if (!GetFormlocalStorage("userInfo")) return navigate("/login");
  }, [navigate]);

  const createDiary = async ({ title, description, eventDate }) => {
    try {
      await axios.post(
        `http://localhost:4000/api/diaries`,
        { title, description, eventDate },
        {
          headers: {
            Authorization: `Bearer ${GetFormlocalStorage("userInfo")?.token}`,
          },
        }
      );
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const updateDiary = async ({ _id, title, description, eventDate }) => {
    try {
      await axios.put(
        `http://localhost:4000/api/diaries/${_id}`,
        { _id, title, description, eventDate },
        {
          headers: {
            Authorization: `Bearer ${GetFormlocalStorage("userInfo")?.token}`,
          },
        }
      );
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
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
      setTitle(data?.title);
      setDescription(data?.description);
      seteventDates(moment(data?.eventDate).format("YYYY-MM-DDTHH:MM"));
      setId(data?._id);
      setFormStatus("edit");
      return data;
      console.log(data);
    } catch (error) {
      setError(error?.response?.data?.error);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (paran.id) {
      getDiary(paran.id);
    } else {
      setFormStatus("create");
      setDescription("");
      setTitle("");
      seteventDates();
      setId(null);
    }
  }, [paran]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formStatus === "edit")
      return updateDiary({ _id: paran.id, title, description, eventDate });
    if (formStatus === "create")
      return createDiary({ title, description, eventDate });
  };
  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="col-md-8 col-12 mx-auto shadow-sm p-5">
          {error && (
            <div className="alert alert-danger text-center mb-3">{error}</div>
          )}
          <h1 className="text-center title">Diary Form</h1> <hr />
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              aria-describedby="titleHelp"
              value={title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              cols={30}
              rows={10}
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              aria-describedby="descriptionHelp"
              value={description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDate" className="form-label">
              Event Data
            </label>
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => seteventDates(e.target.value)}
              id="eventDate"
              aria-describedby="eventDateHelp"
              value={eventDate}
              required
            />
          </div>
          <Link
            to="/"
            type="button"
            className="btn btn-secondary w-50 text-light rounded-0"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary w-50 text-light rounded-0"
          >
            submit
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default Form;
