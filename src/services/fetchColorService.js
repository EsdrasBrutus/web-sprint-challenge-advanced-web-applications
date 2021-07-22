import axiosWithAuth from '../helpers/axiosWithAuth';

export const fetchColorService = () => {
    return axiosWithAuth().get('/colors')
        .then(res => {
            return res.data
      })
      .catch(err => {
            console.log(err)
            return err
      });
};

