import * as api from '../../services/api';

const place = {
  state: {
    places: [],
  },
  reducers: {
    setPlaces(state, places) {
      return { ...state, places };
    },
    addPlace(state, place) {
      return { ...state, places: [...state.places, place] };
    },
    removePlace(state, place) {
      return { ...state, places: state.places.filter((item) => item._id !== place.id) };
    },
  },
  effects: {
    async getPlaces({}) {
      const resp = await api.getPlaces();
      const { total, limit, skip, data } = resp.data;
      this.setPlaces(data);
      return data;
    },
  },
};

export default place;
