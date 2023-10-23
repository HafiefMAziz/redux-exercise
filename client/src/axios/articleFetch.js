import axios from "axios";

const url = "http://localhost:3000/articles";

const getArticles = async (cb) => {
  try {
    const result = await axios({
      method: "GET",
      url: url,
    });
    cb(result.data);
  } catch (error) {
    cb({ message: "Error get", error: error });
  }
};

export { getArticles };
