import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles, addArticle } from "../../redux/slices/articleSlice";
import './Posting.css';

function CreateForm({changesData}) {
  const dispatch = useDispatch();
  const [newArticle, setNewArticle] = useState({ posting: false, userId: JSON.parse(localStorage.getItem('token')).id });
  // const [newArticle, setNewArticle] = useState({ posting: false, userId: +localStorage.getItem('token').id });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newArticle);
    dispatch(addArticle(newArticle));
    changesData(true);
    window.location.reload(true);
  };
  return (
    <>
      <div className="container-form px-5 py-3 rounded">
        <h1 className="display-5">Add a New Article</h1>
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingTitle"
              placeholder="Title"
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
            <label htmlFor="floatingTitle">Title</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="floatingContent"
              placeholder="Content"
              style={{ height: 100 + "px" }}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
            <label htmlFor="floatingContent">Content</label>
          </div>
          <select
            className="form-select mb-3"
            onChange={(e) =>
              setNewArticle({
                ...newArticle,
                posting: JSON.parse(e.target.value),
              })
            }
          >
            <option value={false}>Draft</option>
            <option value={true}>Post</option>
          </select>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={(e) => handleSubmit(e)}
          >
            Confirm
          </button>
        </form>

      </div>
    </>
  );
}

export default CreateForm;
