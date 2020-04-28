const handleMorgan = (router) => {
  router.use(morgan('tiny'));
};
const handleBodyParser = (router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};
const handleCookieParser = (router) => {
  router.use(cookieParser());
};
const handleFIleUpload = (router) => {
  router.use(fileUpload());
  router.use(helemt());
};

module.exports = {
  handleBodyParser,
  handleCookieParser,
  handleMorgan,
  handleFIleUpload,
};
