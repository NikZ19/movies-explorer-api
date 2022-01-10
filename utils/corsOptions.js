const corsOptions = {
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'http://nikz.beatfilm.nomoredomains.rocks',
    'https://nikz.beatfilm.nomoredomains.rocks',
  ],
  methods: 'GET, POST, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization, Origin, Accept',
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
