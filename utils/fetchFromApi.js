import axios from "axios";

const fetchFromApi = (props) => {
  const { url, options } = props;
  axios
    .get(url, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default fetchFromApi;
