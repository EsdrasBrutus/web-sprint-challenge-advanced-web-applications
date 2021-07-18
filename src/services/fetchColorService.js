import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {
    return axiosWithAuth().get('/colors')
        .then(res => {
            return res.data
      })
      .catch(err => {
            console.log(err)
            return err
      });
};

export default fetchColorService;