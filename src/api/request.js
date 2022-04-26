import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.2.4:8001',
	headers: {
		"Token": "jhjdgsdhg3545345"
	}
});

export default instance
  