import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../../redux/slices/articleSlice";

function Home() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <>
      <div className="container py-5">
        <h1 className="display-5">Articles</h1>
        <hr></hr>
        {article.loading ? (
          <p>Loading...</p>
        ) : article.articles ? (
          article.articles
            .map((article) => {
              return article.posting ? <Card key={article.id} article={article} /> : null;
            })
            .reverse()
        ) : null}
      </div>
    </>
  );
}

function Card({ article }) {
  return (
    <div className="card-post card mt-4">
      <div className="card-header d-flex bold">
        <h4 className="me-auto">
          <strong>{article.title}</strong>
        </h4>
      </div>
      <div className="card-body">
        <p>{article.content}</p>
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

export default Home;
