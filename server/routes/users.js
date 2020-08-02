const router = require('express').Router();
const {
  authCtrl,
  register,
  login,
  profile,
  logOut,
  search,
  userDetails,
  uploadProfilePic,
  updateProfile,
  followUpdate,
  createUpdate,
  forgotPassword,
  whoToFollow,
} = require('../controllers/users');
const { auth } = require('../middleware/auth');
//=================================
//             User
//=================================
/*
    @route  api/users/auth
    @desc get User's details
    @access auth
*/
//  auth,
router.get('/auth', authCtrl);

/*
    @route  api/users/register
    @desc register users
    @access public
*/
router.post('/register', register);

/*
    @route  api/users/login
    @desc Login User
    @access public
*/
router.post('/login', login);

/*
    @route  api/users/profile
    @desc get user profile details
    @access auth  
*/
router.post('/profile', profile);

/*
    @route  api/users/logout
    @desc logout user
    @access auth
*/
router.get('/logout', auth, logOut);

/*
    @route  api/users/search
    @desc search for a user
    @access auth
*/
router.get('/search', search);

/*
    @route  api/users/userdetails
    @desc get user details
    @access private
*/
router.post('/userdetails', userDetails);

/*
    @route  api/users/
    @desc 
    @access public
*/
router.post('/uploadProfilePic', uploadProfilePic);

/*
    @route  api/users/
    @desc 
    @access public
*/
router.patch('/updateprofile', updateProfile);

/*
    @route  api/users/
    @desc 
    @access public
*/
router.post('/followupdate', followUpdate);

/*
    @route  api/users/
    @desc 
    @access public
*/
router.post('/createupdate', createUpdate);

/*
    @route  api/users/
    @desc 
    @access public
*/
// router.post('/whotofollow', whoToFollow);

/*
    @route  api/users/
    @desc 
    @access public
*/
router.post('/forgotpassword', forgotPassword);
module.exports = router;
