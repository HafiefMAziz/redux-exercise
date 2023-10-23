import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3000/articles";

const initialState = {
  loading: false,
  articles: [],
  error: null,
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  console.log(`fetchArticles`);
      try {
        const result = await axios({
          method: "GET",
          url: `${URL}?_expand=user`,
        });
        return result.data;
      } catch (error) {
        return { message: "Error fetchArticles", error: error }
      }
  }
);

export const editStatusPosting = createAsyncThunk("articles/editStatusPosting", async (article) => {
    console.log(`editStatusPosting ${article.id} ${article.posting} `);
    try {
      const result = await axios({
        method: "PUT",
        url: `${URL}/${article.id}`,
        data: {...article, posting: !article.posting}
      });
      console.log(result)
      return result.data
    } catch (error) {
      return { message: "Error editStatusPosting", error: error }
    }

  }
);

export const addArticle = createAsyncThunk("articles/addArticle", async (newArticle) => {
    console.log(`addArticle ${JSON.stringify(newArticle)}`);
    try {
      const result = await axios({
        method: "POST",
        url: `${URL}`,
        data: newArticle
      });
      console.log(result)
      return result.data
    } catch (error) {
      return { message: "Error addArticle", error: error }
    }
  }
);

export const editArticle = createAsyncThunk("articles/editArticle", async (editedArticle) => {
  console.log(`editArticle ${JSON.stringify(editedArticle)}`);
  try {
    const result = await axios({
      method: "PUT",
      url: `${URL}/${editedArticle.id}`,
      data: editedArticle
    });
    console.log(result)
    return result.data
  } catch (error) {
    return { message: "Error editArticle", error: error }
  }
}
);

export const deleteArticle = createAsyncThunk("articles/deleteArticle", async (deletedArticle) => {
    console.log(`deleteArticle ${JSON.stringify(deletedArticle)}`);
    try {
      const result = await axios({
        method: "DELETE",
        url: `${URL}/${deletedArticle.id}`
      });
      console.log(result)
      return result.data
    } catch (error) {
      return { message: "Error deleteArticle", error: error }
    }
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    //action.payload return dari createAsyncThunk
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
      state.error = "";
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.articles = [];
      state.error = action.error.message;
    });

    builder.addCase(addArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.articles.push(action.payload);
    });
    builder.addCase(addArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(editArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = state.articles.map(article => {
        if(article.id === action.payload.id){
          article = action.payload;
        }
        return article;
      })
    });
    builder.addCase(editArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = state.articles.filter(article => article.id !== action.payload.id);
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function

export default articleSlice.reducer;
