import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles, editStatusPosting, editArticle, deleteArticle } from "../../redux/slices/articleSlice";
import CreateForm from "./CreateForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Posting() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);

  const [changes, setChanges] = useState(false);

  useEffect(() => {
    dispatch(fetchArticles());
    return () => {
      setChanges(false);
    };
  }, [changes]);

  const changesData = (bool) => setChanges(bool);
  const handlePostingChange = (article) => {
    dispatch(editStatusPosting(article));
    setChanges(true);
  };

  const handleDelete = (deletedArticle) => {
    console.log(deletedArticle);
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteArticle(deletedArticle));
        setChanges(true);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  return (
    <>
      <div className="container py-5">
        <CreateForm changesData={changesData} />
        <hr></hr>
        <h1 className="display-5">Articles</h1>
        <hr></hr>
        {article.loading ? (
          <p>Loading...</p>
        ) : article.articles ? (
          article.articles
            .map((article) => {
              return <Card key={article.id} article={article} handlePostingChange={handlePostingChange} handleDelete={handleDelete} />;
            })
            .reverse()
        ) : null}
      </div>
    </>
  );
}

function Card({ article, handlePostingChange, handleDelete}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(article);

  const handleEdit = () => {
    setIsEditing(false);
    console.log(editedArticle);
    dispatch(editArticle(editedArticle));
  };

  return (
    <div className="card-post card mt-4 px-3 py-2">
      <div className="card-header d-flex bold">
        <div className="form-check form-switch my-auto me-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={article.posting}
            onChange={() => {
              handlePostingChange(article);
              setIsEditing(false);
            }}
          />
        </div>
        {isEditing ? (
          <>
            <input
              className="form-control me-3"
              defaultValue={article.title}
              onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
            />
            <button type="button" className="btn-edit me-3" onClick={() => handleEdit()}>
              <i className="uil uil-save"></i>
            </button>
          </>
        ) : (
          <>
            <h4 className="me-auto my-auto">
              <strong>{article.title}</strong>
            </h4>
            <button type="button" className="btn-edit me-3" onClick={() => setIsEditing(true)}>
              <i className="uil uil-edit"></i>
            </button>
          </>
        )}
        <button type="button" className="btn-edit" onClick={() => handleDelete(article)}>
        <i className="uil uil-trash-alt"></i>
        </button>
      </div>
      <div className="card-body">
        {isEditing ? (
          <>
            <textarea
              className="form-control"
              defaultValue={article.content}
              style={{height: '200px'}}
              onChange={(e) => setEditedArticle({ ...editedArticle, content: e.target.value })}
            />
          </>
        ) : (
          <>
            <p>{article.content}</p>
          </>
        )}
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer mt-1">
            by
            <cite title="Source Title">{` ${article.user.username}`}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

export default Posting;
